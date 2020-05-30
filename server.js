var express = require('express');
var path = require('path');
var socket = require('socket.io');

var app = express();
let cnt = 1

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

server = app.listen(8090, function(){
  console.log('server is running on port 8090')
});


io = socket(server);

io.on('connection', (socket) => {
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