//====================================
//             DEPENDENCIES
//====================================
const express = require('express');
const bcrypt = require('bcrypt');
const recipeRouter = express.Router();
const Recipe = require('../models/recipe');
const User = require('../models/user');


//====================================
//             MIDDLEWARE
//====================================

function isAuthenticated(req, res, next) {
    if(!req.session.user){
        return res.redirect('/login')
    }
    next();
};

//====================================
//             ROUTES
//====================================
//------------------------------------
//INDEX
//------------------------------------
//NEW
recipeRouter.get('/new', isAuthenticated, (req, res) => {
    User.find(req.session.user, (err) => {
        console.log(req.session.user)
        res.render('new.ejs', {
            user: req.session.user
        });
    });
});
//------------------------------------
//DELETE
//------------------------------------
//UPDATE
//------------------------------------
//CREATE
recipeRouter.post('/new', (req, res) => {
    Recipe.create(req.body, (err, newRecipe) => {
        res.redirect('/dashboard')
    });
});
//------------------------------------
//EDIT
//------------------------------------
//SHOW

//------------------------------------
//EXPORT
module.exports = recipeRouter;