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

testRouter.get('/:id',   async (req, res)=>{
    console.log(req.params.id)
    const ret = await testCliet.row(req.params.id);
    console.log({ret})
    res.json({
        message:ret
    });
})


export default testRouter;
