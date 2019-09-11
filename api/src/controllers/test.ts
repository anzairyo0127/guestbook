import * as express from "express";

import {testCliet} from "../singletons"

const testRouter = express.Router();
testRouter.get('/', (req, res)=>{
    const ret = testCliet.raw;
    res.json({
        message:ret
    });
})

export default testRouter;
