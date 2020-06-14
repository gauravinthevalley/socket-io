//Make connection

const socket = io.connect("http://localhost:4000")

// Query DOM

const message = document.getElementById('message')
const handle = document.getElementById('handle')
const btn = document.getElementById('send')
const output = document.getElementById('output')
const feedback = document.getElementById('feedback')

//Emit Events

btn.addEventListener('click', () => {
    
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    })
})

message.addEventListener('keypress', () => {
    
    socket.emit('typing', handle.value)
})

message.addEventListener('blur', () => {
    console.log('Blur')
    socket.emit('nottyping', handle.value)
})

//Listen for Events

socket.on('chat', (data) => {
    feedback.innerHTML = ""
    output.innerHTML += '<p><strong>' + data.handle + ':</strong>' + data.message + '</p>'
})

socket.on('typing', (data) => {
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>'
})

socket.on('nottyping', (data) => {
    console.log('Blur Socket: ', data)
    feedback.innerHTML = ''
})