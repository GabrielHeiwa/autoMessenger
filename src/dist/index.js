"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var socket_1 = __importDefault(require("./socket"));
var server_1 = __importDefault(require("./server"));
var services_1 = __importDefault(require("./services"));
var client;
socket_1.default.on("connect", function (socket) {
    console.log("socket:" + socket.id + " conectado.");
    socket.on("disconnect", function () {
        console.info("socket:" + socket.id + " desconectado.");
        client.destroyClient();
    });
    client = new services_1.default(socket.id);
    client.qrcode();
});
var PORT = process.env.PORT || 4444;
server_1.default.listen(PORT, function () { return console.info("> Running in " + PORT); });
