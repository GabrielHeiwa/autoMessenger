"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var whatsapp_web_js_1 = require("whatsapp-web.js");
var index_1 = require("../index");
var qrcode_1 = require("qrcode");
var WebWhatsappClient = /** @class */ (function () {
    function WebWhatsappClient() {
        var _this = this;
        this.ClientWhatsapp = new whatsapp_web_js_1.Client({
            puppeteer: {
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                ],
                headless: false
            },
        });
        this.ClientWhatsapp.on("disconnected", function () {
            console.log("Disconnected!");
            _this.ClientWhatsapp.destroy();
        });
        this.ClientWhatsapp.on("ready", function () {
            console.log("Whathsapp conectado!");
        });
        this.ClientWhatsapp.initialize();
    }
    ;
    WebWhatsappClient.prototype.qrcode = function (socketID) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.ClientWhatsapp.on("qr", function (qr) { return __awaiter(_this, void 0, void 0, function () {
                    var qrcode;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, qrcode_1.toDataURL(qr, {})];
                            case 1:
                                qrcode = _a.sent();
                                index_1.socketServer.to(socketID).emit("qr", qrcode);
                                console.log("send qr from: " + socketID);
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    ;
    WebWhatsappClient.prototype.sendMessages = function (dataMessages) {
        return __awaiter(this, void 0, void 0, function () {
            var count, interval;
            var _this = this;
            return __generator(this, function (_a) {
                count = 0;
                interval = setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(count === dataMessages.numbers.length)) return [3 /*break*/, 2];
                                return [4 /*yield*/, this.ClientWhatsapp.logout()];
                            case 1:
                                _a.sent();
                                clearInterval(interval);
                                return [2 /*return*/, console.log("End messages")];
                            case 2:
                                ;
                                return [4 /*yield*/, this.ClientWhatsapp.sendMessage(dataMessages.numbers[count] + "@c.us", dataMessages.message)];
                            case 3:
                                _a.sent();
                                console.log(dataMessages.numbers[count] + "@c.us");
                                count++;
                                return [2 /*return*/];
                        }
                    });
                }); }, dataMessages.time);
                return [2 /*return*/];
            });
        });
    };
    ;
    return WebWhatsappClient;
}());
;
exports.default = WebWhatsappClient;
