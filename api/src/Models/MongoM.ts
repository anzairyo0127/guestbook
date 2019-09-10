import {Collection} from "mongodb";

export abstract class MongoModel{
    public collection: Collection;
    constructor(collection: Collection){
        this.collection = collection;
    };
};
