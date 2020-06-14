const express = require('express')
const socket = require('socket.io')

const app = express()

const server = app.listen(4000, () => {
    console.log('listening to request on port 4000')
})

//Static files

app.use(express.static('public'))

//Socket setup

let io = socket(server)
io.on('connection', (socket) => {
    console.log('made socket connection', socket.id)
    socket.on('chat', (data) => {
        io.sockets.emit('chat', data)
    })
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data)
    })
    socket.on('nottyping', (data) => {
        socket.broadcast.emit('nottyping', data)
    })
})