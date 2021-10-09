//====================================
//             DEPENDENCIES
//====================================
const express = require('express');
const bcrypt = require('bcrypt');
const usersRouter = express.Router();
const User = require('../models/user');
const Recipe = require('../models/recipe');


//====================================
//             ROUTES
//====================================

//------------------------------------
//NEW (login page)
usersRouter.get('/login', (req, res) => {
    res.render('login.ejs', {error: ''});
});

//------------------------------------
//NEW (signup page)
usersRouter.get('/signup', (req, res) => {
    res.render('signup.ejs');
});

//------------------------------------
//DELETE (logout)
usersRouter.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

//------------------------------------
//CREATE (login)
usersRouter.post('/login', (req, res) => {
    User.findOne({ username: req.body.username }, (err, foundUser) => {

        if (!foundUser) {
            return res.render('login.ejs', {error: 'Could not find username or password'})
        }

        const isMatched = bcrypt.compareSync(req.body.password, foundUser.password);

        if(!isMatched) {
            return res.render('login.ejs', {error: 'Could not find username or password'})
        }

        req.session.user = foundUser._id
        res.redirect('/dashboard')
    });
});

//------------------------------------
//CREATE (password)
usersRouter.post('/signup', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    User.create(req.body, (err, user) => {
        req.session.user = user._id
        res.redirect('/dashboard')
    });
});

//------------------------------------
//DASHBOARD PROTECTED (dashboard)

// Auth middleware

usersRouter.get('/dashboard', isAuthenticated, (req, res) => {
    User.findById(req.session.user, (err, user) => {
        Recipe.find({}).populate('user').exec((err, recipes) =>{
            res.render('dashboard.ejs', { user, recipes });
            console.log(recipes)
        });
    });
});

function isAuthenticated(req, res, next) {
    if(!req.session.user){
        return res.redirect('/login')
    }
    next();
};
//------------------------------------
//EXPORT
module.exports = usersRouter;
