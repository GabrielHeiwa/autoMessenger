"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_1 = __importDefault(require("socket.io"));
var server_1 = __importDefault(require("./server"));
function SocketIOServer(HTTPServer) {
    var socketIOOptions = {
        cors: {
            origin: "*",
        },
    };
    return new socket_io_1.default.Server(HTTPServer, socketIOOptions);
}
;
exports.default = SocketIOServer(server_1.default);
