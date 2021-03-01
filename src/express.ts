import express, { Express } from "express";
import morgan from "morgan";
import { resolve } from "path";
import { router } from "./routes";

function ExpressApp(): Express {
    const app = express();

    app.use(express.json());
    app.use(morgan("dev"));
    app.use(express.static(resolve(__dirname, "public")));
    app.use(router);

    return app;
};

export default ExpressApp();