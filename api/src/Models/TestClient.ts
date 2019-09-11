import {Pool} from "pg"

export class TestClient{
    private readonly client:Pool;
    constructor(PostGress:Pool){
        this.client = PostGress;
    }
    get raw(){
        this.client.connect((error, client)=>{
            if (error) {
                return error.message 
            } else {
                client.query('SELECT * FROM test', (error, result)=>{
                    if (error) {
                        return error.message
                    } else {
                        return result.rows
                    }
                });
            }
        })
        const ret = this.client.query('SELECT * FROM test');
        return ret 
    }

}