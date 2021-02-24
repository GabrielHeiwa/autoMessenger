import express from "express";
import path from "path";
import { Server } from "socket.io";
import { router } from "./routes";


const app = express();
app.use(express.static(path.resolve(__dirname, "public")));
app.use(router)

const socketServer = new Server(3333, {
    cors: {
        origin: "*",
    },
});


export { app };