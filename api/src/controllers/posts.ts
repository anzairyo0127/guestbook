import * as express from "express";

import {postsClient} from "../singletons"
import {delPostsClient} from "../singletons";
import {insertColumn} from "../Models/Posts"

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

postsRouter.get('/count',   async (req, res)=>{
    var ret = await postsClient.count();
    console.log({ret})
    res.json({
        message:ret
    });
})

postsRouter.post('/post', async (req, res)=>{
    const requests:insertColumn = {
        title:req.body.title,
        text:req.body.text,
        name:req.body.name,
        password:req.body.password
    };
    if (requests) {
        console.log({requests})
        const ret = await postsClient.post(requests)
        res.json({
            message:ret
        });
    } else {
        res.json({
            message:"failed"
        });
    }
})

postsRouter.post('/del', async (req, res)=>{
    const id:string = req.body.id;
    const password:string = req.body.password;
    if(id != undefined || password != undefined){
        const ret = await delPostsClient.auth(id, password);
        console.log({ret});
        res.json({
            message:ret
        });
    } else {
        res.json({
            message:"failed"
        });
    } 
})


export default postsRouter;
