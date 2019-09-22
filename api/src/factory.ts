import * as express from "express";
import * as bodyParser from "body-parser";

import {create_test, create_posts} from "./singletons"
import testRouter from "./controllers/test"
import postsRouter from "./controllers/posts"

export function createApp(){
    const app = express();
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use('/', postsRouter);
    app.use('/test', testRouter);
    create_test(process.env.DATABASE_URL);
    create_posts(process.env.DATABASE_URL);
    return app
};

