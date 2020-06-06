const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();
const maxTurn = 15
const maxPlayers = 6
let cnt = 0
let players = []
let colors = [
    {color: 'primary', use: false},
    {color: "secondary", use: false},
    {color: "success", use: false},
    {color: "warning", use: false},
    {color: "danger", use: false},
    {color: "info", use: false}
]
let points = []
let point = 0
let onGame = false
let hands = []

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

server = app.listen(8090, function(){
    console.log('server is running on port 8090')
});

const addPlayer = (id, name) => {
    if (players.length >= maxPlayers) {
        return false
    } else {
    let _color = null
    colors = colors.map(color => {
    if (_color === null & !color.use) {
        _color = color.color
        return {...color, use: true}
    } else {
        return color
    }
    })
    players.push({
        id: id,
        name: name,
        hand: 0,
        point: 0,
        color: _color
    })
    return true
  }
}

const updatePlayer = (id, hand) => {
    players = players.map(player => {
        if (player.id === id) {
            return {...player, hand: hand}
        } else {
            return player
        }
    })
}

const logout = (id) => {
    players.forEach(player => {
        if (player.id === id) {
        colors = colors.map(color => {
            if (color.color === player.color) {
            return {...color, use: false}
            } else {
            return color
            }
        })
        }
    })
    players = players.filter(player => player.id !== id)
}

const judge = () => {
    let message = null

    const handsNoButting = hands.filter(hand => hand.butting === false)
    if (handsNoButting.length === 0) {
        console.log('CARRY_OVER')
        message = '全員バッティングのためキャリーオーバーです'
        cnt < maxTurn && (point += points.pop())
    } else {
        const hand = handsNoButting.reduce((a,b) => {
            if (point > 0) {
                return a.hand > b.hand ? a : b
            } else {
                return a.hand < b.hand ? a : b
            }
        })
        players = players.map(player => {
            if (player.id === hand.id) {
                message = `${player.name}さんの得点です`
                return {...player, hand: 0, point: player.point + point}
            } else {
                return {...player, hand: 0}
            }
        })
        cnt < maxTurn && (point = points.pop())
    }

    hands=[]
    return message
}

const addHand = (id, hand) => {
    let butting = false
    hands = hands.map(h => {
        if (h.hand === hand) {
            butting = true
            return {...h.hand, butting: true}
        }
        return h
    })
    hands.push({id, hand, butting})
}

const gameEnd = () => {
    cnt = 0
    onGame = false
    players = []
    colors = colors.map(color => ({...color, use: false}))
    points = []
    point = 0
    hands= []
}

const randomSort = ([...array]) => {
    for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

io = socket(server);

io.on('connection', (socket) => {
    socket.on('LOGIN', (name) => {
        console.log('LOGIN')
        if (onGame) {
            io.to(socket.id).emit('LOGIN_FAILED', {message: 'ゲーム中です'})
        } else if (addPlayer(socket.id, name)) {
            io.to(socket.id).emit('LOGIN', {players, name})
            io.emit('NOTIFY', {message: `${name}さんが入室しました`})
            io.emit('UPDATE', {players})
        } else {
            io.to(socket.id).emit('LOGIN_FAILED', {message: '定員オーバーです'})
        }
    })

    socket.on('SEND_HAND', (hand) => {
        console.log('SEND_HAND')
        addHand(socket.id, hand)
        updatePlayer(socket.id, hand)
        io.emit('UPDATE', {players});
        if (players.every(player => player.hand !== 0)) {
            console.log('JUDGE')
            let message = judge()
            let lastGame = false
            if (cnt < maxTurn) {
                cnt++
            } else {
                lastGame = true
            }
            io.emit('JUDGE', {message, lastGame})
        }
    })

    socket.on('NEXT_TURN', () => {
        console.log('NEXT_TURN')
        io.to(socket.id).emit('NEXT_TURN', {title: `${cnt}ターン目`, point: point})
    })

    socket.on('GAME_START', () => {
        console.log('GAME_START')
        onGame = true
        for (let i = -5; i <= 10; i++) {
            if (i === 0) continue
            points.push(i)
        }
        points = randomSort(points)
        cnt++
        point = points.pop()
        io.emit('NEXT_TURN', {title: `${cnt}ターン目`, point: point})
    })

    socket.on('GAME_END', () => {
        console.log('GAME_END')
        gameEnd()
        io.emit('GAME_END')
    })

    socket.on('LOGOUT', (name) => {
        console.log('LOGOUT')
        logout(socket.id)
        io.to(socket.id).emit('LOGOUT')
        socket.broadcast.emit('NOTIFY', {message: `${name}さんが退出しました`})
        socket.broadcast.emit('UPDATE', {players})
    })
});