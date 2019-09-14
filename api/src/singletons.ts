import { Pool } from "pg";

import {TestClient} from "./Models/TestClient"

export let testCliet: TestClient;

export function create_posts(){

};

export function create_users(){

};

export function create_test(uri:string){
    let test = new Pool({connectionString: uri});
    testCliet = new TestClient(test); 
};