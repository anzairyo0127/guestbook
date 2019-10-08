import {Pool} from "pg"

export class TestClient{
    private readonly client:Pool;
    public tableName: String;
    constructor(test:Pool){
        this.client = test;
        this.tableName = "test";
    }

    async row(id:string) {
        let message;
        let query = `SELECT * FROM ${this.tableName} WHERE id=${id}`;
        console.log({ query })
        await this.client.query(query)
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

    async rows() {
        let message;
        await this.client.query(`SELECT * FROM ${this.tableName}`)
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

    async count() {
        let message;
        await this.client.query('SELECT * FROM test')
        .then(function(result){
            console.log({result})
            message = result.rowCount
        })
        .catch(function(reason){
            console.log({reason})
            message = reason.message
        });
        return message
    }
    
    async post() {
        let message;
        await this.client.query('INSET INTO test () VALUES ()')
        .then(function(result){
            console.log({result})
            message = result.rowCount
        })
        .catch(function(reason){
            console.log({reason})
            message = reason.message
        });
        return message
    }
}