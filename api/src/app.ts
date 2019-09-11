import {createApp} from './factory'

const app = createApp();

app.listen(8888, ()=>{
    console.log('こんにちは');
})