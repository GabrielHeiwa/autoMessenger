"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var services_1 = __importDefault(require("./services"));
var router = express_1.Router();
exports.router = router;
router.get("/qrcode", function (request, response) {
    try {
        services_1.default.qrcode();
        return response.status(200);
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
        services_1.default.sendMessages(request.body);
        return response.status(200);
    }
    catch (err) {
        return response.status(400).json({
            msg: "Error in send QRCode from user",
        });
    }
    ;
});
