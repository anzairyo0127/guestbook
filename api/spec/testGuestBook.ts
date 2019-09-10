import * as mongo from "mongodb";

import {GuestBook} from "../src/Models/GuestBook";

const options =  {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongo.MongoClient.connect(process.env.MONGO_URI, options, (error,result)=>{
    if(error){
        console.log(error);
        return error.message;
    }else{
        console.log('OK');
        const db = result.db('guestbook');
        const collection = db.collection('guestbook');
        const id = new mongo.ObjectID('5d74b77b04f6b361458e9d0e');
        const guestBook = new GuestBook(collection);
        console.log(guestBook.findById(id));
    }
})



/*(async()=>{})