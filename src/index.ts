import express from "express";
import path from "path";
import { createServer, ServerOptions } from "http";
import { Server } from "socket.io";
import { router } from "./routes";
import { SocketOptions } from "dgram";
import { ServerOpts } from "net";


const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 3000;


app.use(express.static(path.resolve(__dirname, "public")));
app.use(router)


const socketIOOptions = {
    cors: {
        origin: "*"
    }
};
const socketServer = new Server(server, socketIOOptions);


server.listen(3000, () => console.log(`> Running in http://localhost:${PORT}`));


export { socketServer };