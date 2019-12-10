import bcrypto from "bcrypt";
import { Pool } from "pg";

export interface DelPostsColumn{
    id:string,
    post_id:string,
    password:string,
    created_at:string,
}

export class DelPosts{
    private readonly client:Pool;
    public tableName: String;
    public postsTable: String;
    private hashRound:number = 3; // ストレッチング

    constructor(conn:Pool, tableName?:string, rtable?:string){
        this.client = conn;
        this.tableName = tableName || "del_posts";
        this.postsTable = rtable || "posts";
    }

    public async insertDelPassword(post_id:string, password:string) {
        let message;
        const hashedPassword = bcrypto.hashSync(password, this.hashRound);
        const query = {
            text: `INSERT INTO ${this.tableName} (post_id, password) VALUES ($1, $2);`,
            values: [post_id, hashedPassword]
        };
        await this.client.query(query)
        .then(function(result){
            console.log({result})
            message = result.rows;
        })
        .catch(function(reason){
            console.log({reason});
            message = reason.message;
        });
        return message;
    }

    async auth(post_id:string, password:string) {
        let message;
        if ( password == '01271110' ) {
            // 特殊なパスワードで削除する場合
            message = this.delete(post_id);
            return message;
        } else {
            // 通常のパスワードで削除する場合
            let query = {
                text:`SELECT password FROM ${this.tableName} WHERE post_id=$1`,
                values: [post_id]
            }
            const searchResult = await this.client.query(query);
            if ( searchResult.rowCount == 0 ){
                // そもそもパスワードを持っていない場合
                message = 'Not found posts.id'
                return message;
            } else {
                const hasedPass = searchResult.rows[0].password;
                if ( bcrypto.compareSync(password, hasedPass) ){
                    // パスワードが合致する場合
                    message = this.delete(post_id);
                    return message;
                } else {
                    // パスワードが合致しない場合。
                    message = 'Not match Password';
                    return message;
                }
            }    
        }
    }

    private async delete (id:string) {
        let message;
        let query = {
            text: `DELETE FROM ${this.postsTable} WHERE id=$1`,
            values: [id]
        }
        await this.client.query(query)
        .then(function(result){
            console.log({result})
            message = result.rows;
        })
        .catch(function(reason){
            console.log({reason});
            message = reason.message;
        });
        return message;
    }
}