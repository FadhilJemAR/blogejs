import express from 'express';
import dotenv from 'dotenv';
import expressEjsLayouts from 'express-ejs-layouts';
import { join } from 'path';
import { connectDB } from './lib/mongodb.js';


dotenv.config({path:join(import.meta.dirname,'.env')});
const db = await connectDB(process.env.MONGODB_URI);
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine','ejs');
app.set('views','./views');
app.set('layout','./layouts/layout');
app.use(expressEjsLayouts);

app.get('/',async(req,res)=>{
    const articles = await db.collection('articles').find().toArray();
    res.render('./home/home', {
        title: 'Temukan Artikel Menarik',
        articles
    });
});

app.get('/compose',(req,res)=>{
    res.render('./compose/compose', {
        title: 'Buat artikel menarik'
    });
});

app.post('/api/articles', async (req, res) => {
    const { title, summary, content, category,author } = req.body;

    if (!title || !summary || !content || !category || !author) {
        return res.status(400).json({ message: 'Semua field harus diisi.' });
    }

    try {
        const result = await db.collection('articles').insertOne({
            title,
            summary,
            content,
            category,
            author,
            date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })
        });

        res.status(201).json({ message: 'Artikel berhasil dibuat.', articleId: result.insertedId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Gagal menyimpan artikel.' });
    }
});



app.listen(3000,(err)=>{
    if(err){
         console.error(err);
    }else{
        console.log(`Server has running in http://localhost:${process.env.PORT}`)
    }
});