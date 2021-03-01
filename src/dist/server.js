"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var express_1 = __importDefault(require("./express"));
function HTTPServer(ExpressApp) {
    var server = http_1.createServer(ExpressApp);
    return server;
}
;
exports.default = HTTPServer(express_1.default);
