import { WebSocketServer } from "ws";
import dotenv from "dotenv";
dotenv.config();
const port = Number(process.env.PORT) || 8081;
import pgClient from "db/client";

const wss = new WebSocketServer({
      port : port
});

wss.on("connection",  (ws)=>{
    console.log("WS server running");
    ws.on("message",    async (data)=>{
        console.log('Received:', data.toString());
        const create = await pgClient.user.create({
            data : {
                name : Math.random().toString(),
                email : Math.random().toString(),
                password : Math.random().toString()
            }
        });
        console.log("user created", create);
        ws.send(data.toString());
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    }); 

    ws.on("error", (error)=>{
        console.error('WebSocket error:', error);
    });
});