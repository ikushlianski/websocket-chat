const socket = io.connect('http://localhost:4000');

const message = document.getElementById('message');
const handle = document.getElementById('handle');
const btn = document.getElementById('send');
const output = document.getElementById('chat-output');

btn.addEventListener('click', () => {
  socket.emit('chat', {
    message: message.value,
    handle: handle.value,
  })
});

socket.on('chat', (data) => {
  output.innerHTML += `<p>${data.handle}: ${data.message}</p>`;
});
