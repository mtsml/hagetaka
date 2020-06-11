const express = require('express')
const path = require('path')
const socket = require('socket.io')

const app = express();
const maxTurn = 3
const maxPlayers = 6
const colors = [
    'primary',
    "secondary", 
    "success", 
    "warning", 
    "danger", 
    "info"
]

let rooms = {}

app.use(express.static(path.join(__dirname, 'build')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

server = app.listen(8090, () => {
    console.log('server is running on port 8090')
});

// 同期にしないとまずい
const createRoom = (room) => [
    rooms[room] = {
        players: [],
        onGame: false,
        cnt: 0,
        point: 0,
        points: [],
        hands: []
    }
]

const addPlayer = (id, name, room) => {
    const color = colors.find(color => {
        return !rooms[room].players.some(player => player.color === color)
    })
    rooms[room].players.push({
        id: id,
        name: name,
        hand: 0,
        point: 0,
        color: color
    })
}

const updatePlayer = (id, room, hand) => {
    rooms[room].players = rooms[room].players.map(player => {
        if (player.id === id) {
            return {...player, hand}
        } else {
            return player
        }
    })
}

const logout = (id, room) => {
    rooms[room].players = rooms[room].players.filter(player => player.id !== id)
    if (rooms[room].length === 0) {
        delete rooms[room]
    }
}

const judge = (room) => {
    let ranking = []
    let message = null
    const handsNoButting = rooms[room].hands.filter(hand => hand.butting === false)
    if (handsNoButting.length === 0) {
        console.log('CARRY_OVER')
        message = '全員バッティングのためキャリーオーバーです'
        rooms[room].players = rooms[room].players.map(player => ({...player, hand: 0}))
        rooms[room].cnt < maxTurn && (rooms[room].point += rooms[room].points.pop())
        ranking = rooms[room].hands
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
                message = `${player.name}さんの得点です`
                return {...player, hand: 0, point: player.point + rooms[room].point}
            } else {
                return {...player, hand: 0}
            }
        })
        ranking = rooms[room].hands.map(h => {
            if (h.id === hand.id) {
                return {...h, point: h.point + rooms[room].point}
            } else {
                return h
            }
        })

        rooms[room].cnt < maxTurn && (rooms[room].point = rooms[room].points.pop())
    }

    rooms[room].hands = [...rooms[room].players]
    return { ranking, message }
}

const addHand = (id, room, hand) => {
    let butting = false
    rooms[room].hands = rooms[room].hands.map(h => {
        if (h.hand === hand) {
            butting = true
            return {...h, butting: true}
        }
        return h
    })
    rooms[room].hands = rooms[room].hands.map(h => {
        if (h.id === id) {
            return {...h, hand, butting}
        } else {
            return h
        }
    })
}

const gameEnd = (room) => {
    delete rooms[room]
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
        if (rooms[room].onGame) {
            io.to(socket.id).emit('LOGIN_FAILED', {message: 'ゲーム中です'})
        } else if (rooms[room].players.length < maxPlayers) {    
            addPlayer(socket.id, name, room)
            socket.join(room)
            io.to(socket.id).emit('LOGIN', {players: rooms[room].players, name, room})
            io.to(room).emit('NOTIFY', {message: `${name}さんが入室しました`})
            io.to(room).emit('UPDATE', {players: rooms[room].players})
        } else {
            io.to(socket.id).emit('LOGIN_FAILED', {message: '定員オーバーです'})
        }
    })

    socket.on('GAME_START', (data) => {
        console.log('GAME_START', data)
        const room = rooms[data.room]
        room.onGame = true
        let points = []
        for (let i = -5; i <= 10; i++) {
            if (i === 0) continue
            points.push(i)
        }
        room.points = randomSort(points)
        room.cnt++
        room.hands = [...room.players]
        room.point = room.points.pop()
        const message = room.point > 0 ? '大きい数字で獲得' : '小さい数字で獲得'
        io.to(data.room).emit('NEXT_TURN', {title: `${room.cnt}ターン目`, message, point: room.point})
    })

    socket.on('SEND_HAND', (data) => {
        console.log('SEND_HAND', data)
        const {hand, room} = data
        addHand(socket.id, room, hand)
        updatePlayer(socket.id, room, hand)
        io.to(room).emit('UPDATE', {players: rooms[room].players});
        if (rooms[room].players.every(player => player.hand !== 0)) {
            console.log('JUDGE')
            const { ranking, message } = judge(room)
            let lastGame = false
            if (rooms[room].cnt < maxTurn) {
                rooms[room].cnt++
            } else {
                lastGame = true
            }
            io.to(room).emit('JUDGE', {message, lastGame, players: rooms[room].players, ranking})
        }
    })

    socket.on('NEXT_TURN', (data) => {
        console.log('NEXT_TURN')
        const {room} = data
        const message = rooms[room].point > 0 ? '大きい数字で獲得' : '小さい数字で獲得'
        io.to(socket.id).emit('NEXT_TURN', {
            title: `${rooms[room].cnt}ターン目`, 
            message, 
            point: rooms[room].point
        })
    })

    socket.on('LOGOUT', (data) => {
        console.log('LOGOUT')
        const {room, name} = data
        logout(socket.id, room)
        socket.leave(room)
        io.to(socket.id).emit('LOGOUT')
        socket.broadcast.to(room).emit('NOTIFY', {message: `${name}さんが退出しました`})
        socket.broadcast.to(room).emit('UPDATE', {players: rooms[room].players})
    })

    socket.on('disconnect', () => {
        console.log('disconnect')
        const room = Object.keys(rooms).find(key =>{
            return rooms[key].find(player => player.id === socket.id)
        })
        logout(socket.id, room)
        socket.leave(room)
        socket.broadcast.to(room).emit('NOTIFY', {message: `${name}さんが退出しました`})
        socket.broadcast.to(room).emit('UPDATE', {players})
    })
})