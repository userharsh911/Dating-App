import {Server} from "socket.io";
import express from "express";
import {createServer} from "http"
const app = express();
const server = createServer(app); 

const io = new Server(server,{
    cors:{
        origin: ["http://localhost:5173"],
        credentials: true,
        methods: ["GET", "POST","PUT", "DELETE"]
    }
});

const userMapped = {}

const getSocketId = (userid)=> userMapped[userid]

io.on('connection',async(socket)=>{
    try {
        const userid = socket.handshake.query.userid;
        if(userid){
            userMapped[userid] = socket.id;
        }

        io.emit("onlineUsers",Object.keys(userMapped));


        console.log("user connected ",socket.id, socket.handshake.query.userid);
    } catch (error) {
        console.log("error while connecting to ",error);
    }
})



export {server, app, io, getSocketId};