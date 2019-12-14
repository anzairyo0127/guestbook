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

export interface responseJson {
    status:number,
    date:string,
    message,
    count:number,
}

export class Posts {
    private readonly client:Pool;
    public tableName: String;
    public insertPassword:(id:string, word:string) => void;

    constructor(conn:Pool, table?:string){
        this.client = conn;
        this.tableName = table || "posts";
    }

    retJson (status:number, message, count:number) {
        let ret:responseJson;
        const date = new Date();
        ret = {
            status,
            date: date.toISOString(),
            message,
            count
        }
        return ret;
    };
    
    async row(id:string) {
        let message;
        let count:number;
        const query = {
            text:`SELECT * FROM ${this.tableName} WHERE id=$1`,
            values:[id]
        }
        await this.client.query(query).then((result) => {
            message = result.rows;
            count = result.rowCount;
        }).catch((reason) => {
            message = reason.message;
            count = 0;
        });
        return this.retJson(200, message, count);
    }

    async rows() {
        let message;
        let count:number;
        const query = {
            text: `SELECT * FROM ${this.tableName} ORDER BY created_at DESC`,
            values: []
        }
        await this.client.query(query).then((result) => {
            message = result.rows;
            count = result.rowCount;
        }).catch( (reason) => {
            message = reason.message;
            count = 0;
        });
        return this.retJson(200, message, count);
    }

    async post(insertData: insertColumn) {
        let message;
        let count:number;
        let ret:responseJson;
        const query = {
            text: `INSERT INTO ${this.tableName} (title, text, name) VALUES ($1, $2, $3)`,
            values: [insertData.title, insertData.text, insertData.name,]
        };
        await this.client.query(query).then(async (result) => {
            if(insertData.password) {
                const lastVal =  await this.getLastVal();
                this.insertPassword(lastVal, insertData.password);
            };
            message = 'OK';
            count = 0
            ret = this.retJson(200, message, count);
        }).catch((reason) => {
            message = reason.message;
            count = 0;
            ret = this.retJson(400, message, count);
        });
        return ret;
    }

    async delete(id:string) {
        let message;
        let count:number;
        let ret:responseJson;
        const query = {
            text:`DELETE FROM ${this.tableName} WHERE id=$1`,
            values:[id]
        };
        await this.client.query(query).then((result) => {
            message = 'OK';
            count = result.rowCount
            ret = this.retJson(200, message, count);
        }).catch((reason) => {
            message = reason.message;
            count = 0;
            ret = this.retJson(200, message, count);
        });
        return ret;
    }

    async getLastVal() {
        let message;
        const query = {
            text:`SELECT LASTVAL();`,
            values:[]
        };
        await this.client.query(query).then((result) => {
            message = result.rows[0].lastval;
        }).catch((reason) => {
            message = reason.message;
        });
        return message;
    }
}