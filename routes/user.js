const express = require('express');
const { User } = require('../model/user');

const router = express.Router();

router.get('/signin', (req, res) => {
    res.render('signin.ejs');
});

router.get('/signup', (req, res) => {
    res.render('signup.ejs');
});

router.post('/signup', async(req, res) => {
    const {name, email, password} = req.body;
    await User.create({
        name,
        email,
        password
    });
    res.redirect('/');
})
module.exports = router;