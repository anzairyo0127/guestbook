import * as express from "express";
import * as bodyParser from "body-parser";

import {create_test} from "./singletons"
import testRouter from "./controllers/test"


export function createApp(){
    const app = express();
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use('/test', testRouter);
    create_test(process.env.DATABASE_URL)
    return app
};

