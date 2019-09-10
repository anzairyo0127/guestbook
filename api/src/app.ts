import {createApp} from './factory'

const app = createApp();

app.listen(3000, ()=>{
    console.log('こんにちは');
})