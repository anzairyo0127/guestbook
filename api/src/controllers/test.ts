import * as express from "express";

import {testCliet} from "../singletons"

const testRouter = express.Router();
testRouter.get('/',   async (req, res)=>{
    console.log(req.query.id);
    if (req.query.id){
        var ret = await testCliet.row(req.query.id);
    } else {
        var ret = await testCliet.rows();
    }
    console.log({ret})
    res.json({
        message:ret
    });
})


testRouter.post('/post', async (req, res)=>{
    const name = req.body.name
    console.log(name);
    res.json({
        name:name
    })
})


export default testRouter;
