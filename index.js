const express = require('express');
const path = require('path'); 
const app = express(); 
const userRoutes = require("./routes/user")
const PORT = 8000;
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/BLOGPROJECT').then(e=>console.log('MonogDB Connected')); 

app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));

app.use(express.urlencoded({ extended:false}));
app.get("/", (req,res)=>{
    res.render('home.ejs')
})

app.use("/user", userRoutes);

app.listen(PORT, () =>{
    console.log(`Server Started on port ${PORT}`);
});