const express = require('express')
const path = require('path')
const socket = require('socket.io')

const app = express();
const maxTurn = 15
const maxPlayers = 6
let rooms = {}

app.use(express.static(path.join(__dirname, 'build')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 8090
server = app.listen(port, () => {
    console.log(`server is running on port ${port}`)
});

// 同期にしないとまずい
const createRoom = (room) => [
    rooms[room] = {
        players: [],
        onGame: false,
        cnt: 0,
        point: 0,
        carryPoint: null,
        points: []
    }
]

const addPlayer = (id, name, room) => {
    rooms[room].players.push({
        id: id,
        name: name,
        ready: false,
        hand: 0,
        butting: false,
        point: 0,
        rank: 0
    })
}

const updatePlayer = (id, room, data) => {
    rooms[room].players = rooms[room].players.map(player => {
        if (player.id === id) {
            return {...player, [data.key]: data.value}
        } else {
            return player
        }
    })
}

const logout = (id, room) => {
    if (rooms[room]) {
        rooms[room].players = rooms[room].players.filter(player => player.id !== id)
        if (rooms[room].players.length === 0) {
            delete rooms[room]
        }
    }
}

const sendHand = (id, room, hand) => {
    let butting = false
    rooms[room].players = rooms[room].players.map(h => {
        if (h.hand === hand) {
            butting = true
            return {...h, butting: true}
        }
        return h
    })
    rooms[room].players = rooms[room].players.map(h => {
        if (h.id === id) {
            return {...h, hand, butting}
        } else {
            return h
        }
    })
}

const judge = (room) => {
    let message = null
    let id = ''

    const handsNoButting = rooms[room].players.filter(player => player.butting === false)
    if (handsNoButting.length === 0) {
        console.log('CARRY_OVER')
        message = 'キャリーオーバー'
    } else {
        const hand = handsNoButting.reduce((a,b) => {
            if (rooms[room].point > 0) {
                return a.hand > b.hand ? a : b
            } else {
                return a.hand < b.hand ? a : b
            }
        })
        rooms[room].players = rooms[room].players.map(player => {
            if (player.id === hand.id) {
                message = `${player.name}さんの得点です！`
                id = player.id
                const totalPoint = rooms[room].carryPoint===null?rooms[room].point:rooms[room].point+rooms[room].carryPoint
                return {...player, point: player.point + totalPoint}
            } else {
                return {...player}
            }
        })
    }

    rooms[room].players.sort((a,b) => {
        if (a.point > b.point) return -1
        if (a.point < b.point) return 1
        return 0
    })

    let rank = 0
    let point = null
    rooms[room].players = rooms[room].players.map(player => {
        if (point===null||point!==player.point) {
            point = player.point
            rank++
        }
        return {...player, rank}
    })

    rooms[room].players.sort((a, b) => {
        if (rooms[room].point > 0) {
            if (a.hand > b.hand) return -1
            if (a.hand < b.hand) return 1
            return 0
        } else {
            if (a.hand > b.hand) return 1
            if (a.hand < b.hand) return -1
            return 0
        }
    })

    if (rooms[room].cnt < maxTurn) {
        if (handsNoButting.length === 0) {
            rooms[room].carryPoint += rooms[room].point
        } else {
            rooms[room].carryPoint = null
        }
        rooms[room].point = rooms[room].points.pop()
    }

    return {message, id}
}

const randomSort = ([...array]) => {
    for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

io = socket(server)

io.on('connection', (socket) => {
    socket.on('LOGIN', (data) => {
        console.log('LOGIN', data)
        const {name, room} = data
        if (!rooms[room]) {
            createRoom(room)
        }
        if (rooms[room].players.some(player => player.name === name)) {
            io.to(socket.id).emit('LOGIN_FAILED', {message: 'その名前はルーム内で既に使われています'})            
        } else if (rooms[room].onGame) {
            io.to(socket.id).emit('LOGIN_FAILED', {message: 'ゲーム中です'})
        } else if (rooms[room].players.length < maxPlayers) {    
            addPlayer(socket.id, name, room)
            socket.join(room)
            io.to(socket.id).emit('LOGIN', {players: rooms[room].players, message: room ,name, room})
            socket.broadcast.to(room).emit('UPDATE', {players: rooms[room].players})
        } else {
            io.to(socket.id).emit('LOGIN_FAILED', {message: '定員オーバーです'})
        }
    })

    socket.on('GAME_START', (data) => {
        console.log('GAME_START', data)
        updatePlayer(socket.id, data.room, {key: 'ready', value: true})
        if (rooms[data.room].players.every(player => player.ready === true)) {
            const room = rooms[data.room]
            room.onGame = true
            let points = []
            for (let i = -5; i <= 10; i++) {
                if (i === 0) continue
                points.push(i)
            }
            room.points = randomSort(points)
            room.cnt++
            room.point = room.points.pop()
            const message =`${room.point > 0 ? '大きい数字で得点' : '小さい数字で得点'}`
            io.to(data.room).emit('NEXT_TURN', {cnt: room.cnt, message, point: room.point, carryPoint: room.carryPoint})
        }
    })

    socket.on('SEND_HAND', (data) => {
        console.log('SEND_HAND', data)
        const {hand, room} = data
        sendHand(socket.id, room, hand)
        if (rooms[room].players.every(player => player.hand !== 0)) {
            console.log('JUDGE')
            const {message, id} = judge(room)
            let lastGame = false
            if (rooms[room].cnt < maxTurn) {
                rooms[room].cnt++
            } else {
                lastGame = true
            }
            io.to(room).emit('JUDGE', {message, lastGame, players: rooms[room].players, id})
            if (lastGame) {
                delete rooms[room]
            } else {
                rooms[room].players = rooms[room].players.map(player => ({...player, hand: 0, batting: false}))
            }
        }
    })

    socket.on('NEXT_TURN', (data) => {
        console.log('NEXT_TURN')
        const {room} = data
        const message = rooms[room].point > 0 ? '大きい数字で得点' : '小さい数字で得点'
        io.to(socket.id).emit('NEXT_TURN', {
            cnt: rooms[room].cnt, 
            message, 
            point: rooms[room].point,
            carryPoint: rooms[room].carryPoint
        })
    })

    socket.on('LOGOUT', (data) => {
        console.log('LOGOUT')
        const {room} = data
        logout(socket.id, room)
        socket.leave(room)
        io.to(socket.id).emit('LOGOUT')
        if (rooms[room]) {
            socket.broadcast.to(room).emit('UPDATE', {players: rooms[room].players})
        }
    })

    socket.on('disconnect', () => {
        console.log('disconnect')
        const room = Object.keys(rooms).find(key =>{
            return rooms[key].players.find(player => player.id === socket.id)
        })
        logout(socket.id, room)
        socket.leave(room)
        if (rooms[room]) {
            socket.broadcast.to(room).emit('UPDATE', {players: rooms[room].players})
        }
    })
})
