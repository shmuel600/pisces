import connectDB from '@/middleware/mongodb'
import { Server } from 'socket.io'

const socketHandler = async (req, res) => {
    if (res.socket.server.io) {
        console.log('Socket is already running')
    }
    else {
        console.log('Socket is initializing')
        const io = new Server(res.socket.server)
        res.socket.server.io = io

        io.on('connect', socket => {
            socket.on('join', newRoom => {
                socket.join(newRoom)
                socket.emit('joined', newRoom)
                socket.on('send', msg => {
                    socket.to(newRoom).emit('new-message', msg)
                })
            })
        })
    }

    res.end();
};

export default connectDB(socketHandler);