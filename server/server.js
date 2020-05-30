var express = require('express');
var socket = require('socket.io');

var app = express();

server = app.listen(8080, function(){
  console.log('server is running on port 8080')
});

io = socket(server);

io.on('connection', (socket) => {
  socket.on('SEND_MESSAGE', function(data){
    console.log('RECEIVE_MESSAGE')
    io.emit('RECEIVE_MESSAGE', data);
  })
});