import { Express } from "express";
import { createServer, Server } from "http";
import ExpressApp from "./express";

function HTTPServer(ExpressApp: Express): Server {
    const PORT = process.env.PORT || 4444;
    const server = createServer(ExpressApp);
    
    server.listen(PORT);
    
    return server;
};

export default HTTPServer(ExpressApp);