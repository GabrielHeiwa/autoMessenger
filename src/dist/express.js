"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var path_1 = require("path");
var routes_1 = require("./routes");
function ExpressApp() {
    var app = express_1.default();
    app.use(express_1.default.json());
    app.use(morgan_1.default("dev"));
    app.use(express_1.default.static(path_1.resolve(__dirname, "public")));
    app.use(routes_1.router);
    return app;
}
;
exports.default = ExpressApp();
