const express = require('express');
const path = require('path')
const {connectMongoDB} = require('./connection/connect')
const app = express();
const PORT = 3000;
const userRouter = require('./routes/user');

connectMongoDB('mongodb://localhost:27017/Rai-Blog').then((e)=>{
    console.log('MongoDB connected')
})

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'))

app.get('/', (req,res)=>{
    res.render('home.ejs');
})
app.use('/user', userRouter)

app.listen(PORT, ()=>console.log(`Server is running on port ${PORT}`));