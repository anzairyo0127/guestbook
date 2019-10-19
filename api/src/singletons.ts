import { Pool } from "pg";

import {Posts} from "./Models/Posts"

export let postsClient: Posts;

export function create_users(){

};

export function create_posts(uri:string){
    const conn = new Pool({connectionString: uri});
    postsClient = new Posts(conn);
};
