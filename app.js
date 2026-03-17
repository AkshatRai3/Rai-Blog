require('dotenv').config();

const express = require('express');
const path = require('path'); 
const cookieParser = require('cookie-parser')
const Blog = require("./models/blog")

const userRoutes = require("./routes/user")
const blogRoutes = require("./routes/blog")

const app = express(); 
const PORT = process.env.PORT || 8000;
const mongoose = require('mongoose');
const { checkForAuthenticationCookie } = require('./middlewares/authentication');

mongoose.connect(process.env.MONGO_URL).then(e=>console.log('MonogDB Connected')); 

app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));

app.use(express.urlencoded({ extended:false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));
app.use(express.static(path.resolve("/uploads")));

app.get("/", async(req,res)=>{
    const allBlogs = await Blog.find({}).sort();
    res.render('home.ejs', {
        user: req.user,
        blogs: allBlogs
    })
})

app.use("/user", userRoutes);
app.use("/blog", blogRoutes);

app.listen(PORT, () =>{
    console.log(`Server Started on port ${PORT}`);
});