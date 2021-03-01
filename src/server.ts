import { Express } from "express";
import { createServer, Server } from "http";
import ExpressApp from "./express";

function HTTPServer(ExpressApp: Express): Server {
    const server = createServer(ExpressApp);
    return server;
};

export default HTTPServer(ExpressApp);