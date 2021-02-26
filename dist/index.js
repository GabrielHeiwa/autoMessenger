"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketServer = void 0;
var express_1 = __importDefault(require("express"));
var http_1 = require("http");
var path_1 = __importDefault(require("path"));
var socket_io_1 = require("socket.io");
var routes_1 = require("./routes");
var morgan_1 = __importDefault(require("morgan"));
var app = express_1.default();
var server = http_1.createServer(app);
var PORT = process.env.PORT || 3333;
app.use(morgan_1.default("dev"));
app.use(express_1.default.static(path_1.default.resolve(__dirname, "public")));
app.use(routes_1.router);
var socketIOOptions = {
    cors: {
        origin: "*"
    }
};
var socketServer = new socket_io_1.Server(server, socketIOOptions);
exports.socketServer = socketServer;
server.listen(PORT, function () { return console.log("> Running"); });
