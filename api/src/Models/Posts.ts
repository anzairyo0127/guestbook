import {Pool} from "pg"

export interface tableColumn{
    id,
    title,
    text,
    name,
    created_at
}

export class Posts{
    private readonly client:Pool;
    public tableName: String;
    constructor(conn:Pool){
        this.client = conn;
        this.tableName = "posts";
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
            console.log({reason});
            message = reason.message;
        });
        return message;
    }

    async rows() {
        let message;
        await this.client.query(`SELECT * FROM ${this.tableName} ORDER BY created_at ASC`)
        .then(function(result){
            console.log({result});
            message = result.rows;
        })
        .catch(function(reason){
            console.log({reason});
            message = reason.message;
        });
        return message;
    }

    async count() {
        let message;
        await this.client.query(`SELECT * FROM ${this.tableName}`)
        .then(function(result){
            console.log({result});
            message = result.rowCount;
        })
        .catch(function(reason){
            console.log({reason});
            message = reason.message;
        });
        return message
    }
    async post(insertData: tableColumn) {
        let message;
        await this.client.query(`INSET INTO ${this.tableName} (title, text, name) VALUES (${insertData.title}, ${insertData.text}, ${insertData.name})`)
        .then(function(result){
            console.log({result})
            message = result.rowCount;
        })
        .catch(function(reason){
            console.log({reason});
            message = reason.message;
        });
        return message;
    }
}