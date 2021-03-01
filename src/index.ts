import express from "express";
import path from "path";
import { Server } from "socket.io";
import { router } from "./routes";
import { createServer } from "http";
import morgan from "morgan";

const app = express();
const server = createServer(app);
const socketIOOptions = {
    cors: {
        origin: "*"
    },
};
const socketServer = new Server(server, socketIOOptions);

const PORT = process.env.PORT || 4444;

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.resolve(__dirname, "public")));
app.use(router)

server.listen(4444, () => console.log("> Running"));

export { socketServer };
