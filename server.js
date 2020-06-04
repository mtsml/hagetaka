const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();
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
let point = []
let onGame = false

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

server = app.listen(8090, function(){
  console.log('server is running on port 8090')
});

const addPlayer = (id, name) => {
  if (players.length >=6) {
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

const gameStart = () => {
    if (cnt === 0) {
        onGame = true
        for (let i = -5; i <= 10; i++) {
            if (i === 0) continue
            point.push(i)
        }
    }
    cnt++
}

const gameEnd = () => {
    cnt = 0
    onGame = false
    players = []
    colors = colors.map(color => ({...color, use: false}))
}

io = socket(server);

io.on('connection', (socket) => {
  socket.on('INIT', (name) => {
    console.log('INIT')
    if (onGame) {
      io.to(socket.id).emit('INIT_FAILED', {message: 'ゲーム中です'})
    } else if (addPlayer(socket.id, name)) {
      io.to(socket.id).emit('LOGIN', {players, name})
      io.emit('INIT', {players, message: `${name}さんが入室しました。`})
    } else {
      io.to(socket.id).emit('INIT_FAILED', {message: '定員オーバーです'})
    }
  })

  socket.on('SEND_HAND', function(hand){
    console.log('SEND_HAND')
    updatePlayer(socket.id, hand)
    io.emit('UPDATE_PLAYER', {players});
  })

  socket.on('GAME_START', () => {
    console.log('GAME_START')
    if (cnt === 15) {
        io.emit('GAME_END')
    } else {
        gameStart()
        io.emit('GAME_START', {title: `${cnt}ターン目`, point: point.pop()})
    }
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
    socket.broadcast.emit('INIT', {players, message: `${name}さんが退出しました。`})
  })
});