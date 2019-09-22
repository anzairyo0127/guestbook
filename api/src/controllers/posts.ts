import * as express from "express";

import {postsClient} from "../singletons"

const postsRouter = express.Router();
postsRouter.get('/',   async (req, res)=>{
    console.log(req.query.id);
    if (req.query.id){
        var ret = await postsClient.row(req.query.id);
    } else {
        var ret = await postsClient.rows();
    }
    console.log({ret})
    res.json({
        message:ret
    });
})


postsRouter.post('/post', async (req, res)=>{
    const name = req.body.name
    console.log(name);
    res.json({
        name:name
    })
})


export default postsRouter;
