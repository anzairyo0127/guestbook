import * as express from "express";
import testRouter from "./controllers/test"

export function createApp(){
    const app = express();
    app.use('/test', testRouter);
    return app
};

