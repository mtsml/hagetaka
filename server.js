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
  "danger"
]

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

server = app.listen(8090, function(){
  console.log('server is running on port 8090')
});


const addPlayer = (name) => {
  players.push({
    name: name,
    hand: 0,
    point: 0,
    color: colors.pop()
  })
}

io = socket(server);

io.on('connection', (socket) => {
  socket.on('INIT', function(name){
    console.log('INIT', name)
    addPlayer(name)
    io.emit('INIT', {players,name})
  })

  socket.on('SEND_MESSAGE', function(data){
    console.log('RECEIVE_MESSAGE')
    io.emit('RECEIVE_MESSAGE', data);
  })

  socket.on('COUNT_UP', function(data){
    console.log('COUNT_UP')
    cnt++
    io.emit('UPDATE_COUNT', cnt);
  })
});