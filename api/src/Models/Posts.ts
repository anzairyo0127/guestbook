import { Pool } from 'pg';

export interface PostsColumn {
    id:string,
    title:string,
    text:string,
    name:string,
    created_at:string
}

export interface insertColumn {
    title:string,
    text:string,
    name:string,
    password?:string
}

export class Posts {
    private readonly client:Pool;
    public tableName: String;
    public onPassword: Promise<any>;
    public insertPassword:(id:string, word:string) => void;
    constructor(conn:Pool, table?:string){
        this.client = conn;
        this.tableName = table || "posts";
    }

    async row(id:string) {
        let message;
        const query = {
            text:`SELECT * FROM ${this.tableName} WHERE id=$1`,
            values:[id]
        }
        console.log(query);
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
        const query = {
            text: `SELECT * FROM ${this.tableName} ORDER BY created_at DESC`,
            values: []
        }
        await this.client.query(query)
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
        const query = {
            text: `SELECT COUNT(id) FROM ${this.tableName}`,
            values: []
        }
        await this.client.query(query.text, query.values)
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

    async post(insertData: insertColumn) {
        let message;
        const query = {
            text: `INSERT INTO ${this.tableName} (title, text, name) VALUES ($1, $2, $3)`,
            values: [insertData.title, insertData.text, insertData.name,]
        };
        await this.client.query(query)
        .then(async (result) => {
            console.log({result})
            if(insertData.password){
                const lastVal =  await this.getLastVal();
                this.insertPassword(lastVal, insertData.password)
            };
            message = result;
        })
        .catch(function(reason){
            console.log({reason});
            message = reason.message;
        });
        return message;
    }

    async delete(id:string) {
        let message;
        const query = {
            text:`DELETE FROM ${this.tableName} WHERE id=$1`,
            values:[id]
        };
        await this.client.query(query)
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

    async getLastVal() {
        let message;
        const query = {
            text:`SELECT LASTVAL();`,
            values:[]
        };
        await this.client.query(query)
        .then(function(result){
            console.log({result})
            message = result.rows[0].lastval;
        })
        .catch(function(reason){
            console.log({reason});
            message = reason.message;
        });
        return message;
    }
}