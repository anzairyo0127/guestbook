import {Pool} from "pg"

export class TestClient{
    private readonly client:Pool;
    constructor(test:Pool){
        this.client = test;
    }
    async rows() {
        let message;
        await this.client.query('SELECT * FROM test')
        .then(function(result){
            console.log({result})
            message = result.rows
        })
        .catch(function(reason){
            console.log({reason})
            message = reason.message
        });
        return message
    }
}