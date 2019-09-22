import {createApp} from './factory'

const app = createApp();

app.listen(8888, ()=>{
    console.log('Listen to port http://localhost:8888');
})