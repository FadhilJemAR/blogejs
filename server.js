import express from 'express';
import dotenv from 'dotenv';
import expressEjsLayouts from 'express-ejs-layouts';
import { join } from 'path';
import { ObjectId } from 'mongodb';
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
    return res.render('./home/home', {
        title: 'Temukan Artikel Menarik',
        articles
    });
});

app.get('/compose',(req,res)=>{
   return  res.render('./compose/compose', {
        title: 'Buat artikel menarik'
    });
});

app.get('/article/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const article = await db.collection('articles').findOne({ _id: new ObjectId(id) });

        if (!article) {
            return res.status(404).render('./article/article', {
                title: 'Artikel tidak ditemukan',
                article: null
            });
        }

       return res.render('./article/article', {
            title: article.title,
            article
        });
    } catch (error) {
        console.error(error);
        return res.status(400).render('./article/article', {
            title: 'ID artikel tidak valid',
            article: null
        });
    }
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

        return res.status(201).json({ message: 'Artikel berhasil dibuat.', articleId: result.insertedId });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Gagal menyimpan artikel.' });
    }
});

app.use((req,res)=>{ //NOT FOUND
    return res.status(404).render('./notfound/notfound', {
        title: 'Halaman tidak ditemukan'
    });
})

app.listen(3000,(err)=>{
    if(err){
         console.error(err);
    }else{
        console.log(`Server has running in http://localhost:${process.env.PORT}`)
    }
});