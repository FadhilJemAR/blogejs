import express from 'express';
import dotenv from 'dotenv';
import expressEjsLayouts from 'express-ejs-layouts';
import { join } from 'path';
import { connectDB } from './lib/mongodb.js';


dotenv.config({path:join(import.meta.dirname,'.env')});
const db = await connectDB(process.env.MONGODB_URI);
const app = express();


app.set('view engine','ejs');
app.set('views','./views');
app.set('layout','./layouts/layout');
app.use(expressEjsLayouts);



app.get('/home',(req,res)=>{
    res.render('./home/home', {
        title: 'Temukan Artikel Menarik'
    });
});

app.get('/compose',(req,res)=>{
    res.render('./compose/compose', {
        title: 'Buat artikel menarik'
    });
});




app.listen(3000,(err)=>{
    if(err){
         console.error(err);
    }else{
        console.log(`Server has running in http://localhost:${process.env.PORT}`)
    }
});