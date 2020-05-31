const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();
let cnt = 1
let players = []
const colors = [
  'primary',
  "secondary",
  "success",
  "warning",
  "danger",
  "info"
]

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
    players.push({
      id: id,
      name: name,
      hand: 0,
      point: 0,
      color: colors.pop()
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

io = socket(server);

io.on('connection', (socket) => {
  socket.on('INIT', function(name){
    console.log('INIT')
    if (addPlayer(socket.id, name)) {
      io.to(socket.id).emit('LOGIN', {players})
      io.emit('INIT', {players,name})
    } else {
      io.to(socket.id).emit('INIT_FAILED', {message: '定員オーバーです'})
    }
  })

  socket.on('SEND_HAND', function(hand){
    console.log('SEND_HAND')
    updatePlayer(socket.id, hand)
    io.emit('UPDATE_PLAYER', {players});
  })

  socket.on('COUNT_UP', function(data){
    console.log('COUNT_UP')
    cnt++
    io.emit('UPDATE_COUNT', cnt);
  })
});