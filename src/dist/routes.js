"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var _1 = require(".");
var services_1 = __importDefault(require("./services"));
var router = express_1.Router();
exports.router = router;
var client;
router.get("/qrcode", function (request, response) {
    try {
        client = new services_1.default();
        _1.socketServer.on("connection", function (socket) {
            console.log(socket.id);
            client.qrcode(socket.id);
        });
        return response.status(200).send("ok");
    }
    catch (err) {
        return response.status(400).json({
            msg: "Error in send QRCode from user",
        });
    }
    ;
});
router.post("/send", function (request, response) {
    try {
        console.log(request.body);
        client.sendMessages(request.body);
        return response.status(200).send("ok");
    }
    catch (err) {
        return response.status(400).json({
            msg: "Error in send QRCode from user",
        });
    }
    ;
});
