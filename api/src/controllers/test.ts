import * as express from "express";

import {testCliet} from "../singletons"

const testRouter = express.Router();
testRouter.get('/',   async (req, res)=>{
    const ret = await testCliet.rows();
    console.log({ret})
    res.json({
        message:ret
    });
})

export default testRouter;
