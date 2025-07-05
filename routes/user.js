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
    const user = await User.matchPassword(email,password);

    console.log(user);
    return res.redirect('/')

})
module.exports = router;