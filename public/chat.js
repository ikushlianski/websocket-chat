const socket = io.connect('http://localhost:4000');

const message = document.getElementById('message');
const handle = document.getElementById('handle');
const btn = document.getElementById('send');
const output = document.getElementById('chat-output');
const feedback = document.getElementById('feedback');

btn.addEventListener('click', () => {
  sendChatMessage(socket, handle, message);
});

document.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    sendChatMessage(socket, handle, message);
  }
});

message.addEventListener('keypress', () => {
  socket.emit('typing', handle.value);
});

socket.on('chat', (data) => {
  output.innerHTML += `<p class="chat-message"><b>${data.handle}</b>: ${data.message}</p>`;
  feedback.innerHTML = null;
});

socket.on('typing', (data) => {
  feedback.innerHTML = `<p class="feedback">${data} is typing message...</p>`
})

function sendChatMessage(socket, handle, message) {
  socket.emit('chat', {
    message: message.value,
    handle: handle.value,
  })
}
