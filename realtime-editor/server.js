import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import ACTIONS from './src/Actions.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const userSocketMap = {};

function getAllConnectedClients(roomId){
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId)=>{
        return {
            socketId, 
            userName: userSocketMap[socketId],
        };
    });
}

io.on('connection', (socket) => {
    console.log('socket connected', socket.id);
    socket.on(ACTIONS.JOIN, ({roomId, userName})=>{
        userSocketMap[socket.id] = userName;
        socket.join(roomId);
        const clients = getAllConnectedClients(roomId);
        //console.log(clients);
        //console.log(`SERVER: Emitting JOINED event to room ${roomId}`);
        clients.forEach(({socketId})=>{
            io.to(socketId).emit(ACTIONS.JOINED,{
                clients,
                userName,
                socketId: socket.id,
            });
        });
    });

    socket.on('disconnecting',()=>{
        const rooms = [...socket.rooms];
        rooms.forEach((roomId)=>{
            socket.in(roomId).emit(ACTIONS.DISCONNECTED,{
                socketId: socket.id,
                userName: userSocketMap[socket.id], 
            });
        });
        delete userSocketMap[socket.id];
        socket.leave();
    });
});

//Gemini code for emitting who has joined the room
// io.on('connection', (socket) => {
//     console.log('socket connected', socket.id);

//     socket.on(ACTIONS.JOIN, ({ roomId, userName }) => {
//         // Associate the userName with the joining socket's ID
//         userSocketMap[socket.id] = userName;
//         socket.join(roomId);

//         // Get the list of all clients in the room AFTER the new user has joined
//         const clients = getAllConnectedClients(roomId);

//         // 1. EMIT TO THE NEW USER: Send the full client list to the person who just joined.
//         socket.emit(ACTIONS.JOINED, {
//             clients,
//             userName: userName, // Their own username
//             socketId: socket.id,
//         });

//         // 2. BROADCAST TO EXISTING USERS: Tell everyone else a new user has joined.
//         socket.broadcast.to(roomId).emit(ACTIONS.JOINED, {
//             clients,
//             userName: userName, // The new user's name
//             socketId: socket.id,
//         });
//     });

//     // ... your disconnect logic
// });


const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});