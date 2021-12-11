const socket=io('http://localhost:8000');

const form = document.getElementById('send-container')
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")
var audio=new Audio('iphone_notification.mp3');

const append=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left'){
    audio.play();
}
}

const name=prompt("Enter your name to joining the chat");
socket.emit('new-user-joined',name );


socket.on('user-joined',name=>{
    append(`${name} joined the chat` ,'centre')
})

socket.on('receive', data => {
    append(`${data.name} : ${data.message}`, 'left')
})

socket.on('left', name => {
    append(`${name} left the chat`, 'centre')
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = ''
})