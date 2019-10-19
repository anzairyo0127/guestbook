import e from "express";
import * as bodyParser from "body-parser";

import {create_posts} from "./singletons"
import postsRouter from "./controllers/posts"

export function createApp(){
    const app = e();
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use('/', postsRouter);
    create_posts(<string>process.env.DATABASE_URL);
    return app
};

