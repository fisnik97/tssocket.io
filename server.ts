import express from 'express'
import { Server } from 'socket.io'
import http from 'http'

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use(express.json());

app.post('/send-message', (req,res) => {
    const {message, routingKey}  = req.body;

    if(!message || !routingKey){
        return res.status(400).send("Please provide a message and a routing key")
    }

    console.log({message, routingKey})
    io.emit(routingKey, message)
    res.send("Message has been sent!")
})

io.on('connection', (socket) => {
    console.log('A user is connected!')

    socket.on('introduction-message', (args) => {
        console.log(`A user has sent you an introduction message: ${args}`)

    })

    socket.on('disconnect', () => {
        console.log("User disconnected!")
    });
})

server.listen(3000, () => {
    console.log("Server is running on port 3000")
})

