import {Collection, ObjectID} from "mongodb"
import {MongoModel} from "./MongoM";

export class GuestBook extends MongoModel {
    constructor(collection:Collection){
        super(collection);
    };
    findById(_id: ObjectID){
        this.collection.find({"_id":_id}).toArray(
            function(error, result){
                if(error){
                    return error
                }else{
                    return result
                }
            }
        );
    };
    ids(page:number){

    };
};
