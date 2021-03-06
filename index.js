const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(4000, () => console.log('Listening for requests on port 4000'));

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('made socket connection');

  socket.on('chat', (data) => {
    io.sockets.emit('chat', data);
  })

  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data);
  })
});

