import express from "express";
import { createServer } from "http";
import path from "path";
import { Server } from "socket.io";
import { router } from "./routes";
import morgan from "morgan";

const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 3333;


app.use(morgan("dev"));
app.use(express.static(path.resolve(__dirname, "public")));
app.use(router)


const socketIOOptions = {
    cors: {
        origin: "*"
    }
};
const socketServer = new Server(server, socketIOOptions);


server.listen(PORT, () => console.log(`> Running`));


export { socketServer };
