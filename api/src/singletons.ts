import { Pool } from "pg";

import {TestClient} from "./Models/TestClient"
import {Posts} from "./Models/Posts"

export let testCliet: TestClient;
export let postsClient: Posts;

export function create_users(){

};

export function create_posts(uri:string){
    const conn = new Pool({connectionString: uri});
    postsClient = new Posts(conn);
};

export function create_test(uri:string){
    const test = new Pool({connectionString: uri});
    testCliet = new TestClient(test); 
};