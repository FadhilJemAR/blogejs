import express from 'express';
import dotenv from 'dotenv';
import { join } from 'path';
dotenv.config({path:join(import.meta.dirname,'.env')});

const app = express();

app.set('view engine','ejs');
app.set('views','./views');



app.get('/',(req,res)=>{
    res.send('ahahah')
})


app.listen(3000,(err)=>{
    if(err){
         console.error(err);
    }else{
        console.log(`Server has running in http://localhost:${process.env.PORT}`)
    }
})