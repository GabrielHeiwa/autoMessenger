import express from "express";
import path from "path";
import { Server } from "socket.io";
import { router } from "./routes";
import morgan from "morgan";

const app = express();
const PORT = process.env.PORT || 4444;

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.resolve(__dirname, "public")));
app.use(router)


const socketIOOptions = {
    cors: {
        origin: "*"
    }
};
const socketServer = new Server(3333, socketIOOptions);



app.listen(PORT, () => console.log(`> Running`));


export { socketServer };
