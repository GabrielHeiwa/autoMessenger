import { Server } from "http";
import socketIO, { ServerOptions } from "socket.io";
import HTTPServer from "./server";

function SocketIOServer(HTTPServer: Server) {
    const socketIOOptions = {
        cors: {
            origin: "*",
        },
    };

    return new socketIO.Server(HTTPServer, socketIOOptions);
};

export default SocketIOServer(HTTPServer);