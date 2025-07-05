const express = require('express');
const { User } = require('../model/user.js');

const router = express.Router();

router.get('/signin', (req, res) => {
    res.render('signin.ejs');
});

router.get('/signup', (req, res) => {
    res.render('signup.ejs');
});

router.post('/signup', async(req, res) => {
    const {fullname, email, password} = req.body;
    await User.create({
        fullname,
        email,
        password
    });
    res.redirect('/');
})

router.post('/signin', async(req, res) =>{
    const {email, password } = req.body;
    try{
        const token = await User.matchPasswordAndGenerateToken(email,password);
        return res.cookie('token',token).redirect('/');

    }catch(error){
        return res.render('signin.ejs',{
            error: 'Invalid email or password'
        })
    }
    
})
module.exports = router;