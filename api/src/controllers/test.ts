import * as express from "express";
export const testRouter = express.Router();

testRouter.get('/', (req, res)=>{
    res.send('hoge');
})

export default testRouter;
