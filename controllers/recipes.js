//====================================
//             DEPENDENCIES
//====================================
const express = require('express');
const bcrypt = require('bcrypt');
const multer = require('multer');
const recipeRouter = express.Router();
const Recipe = require('../models/recipe');
const User = require('../models/user');
const Image = require('../models/images')
const fs = require('fs');
const path = require('path');
const uuid = require('uuid').v4;

const storage = multer.diskStorage({
    destination: (req, file, newFile) => {
        newFile(null, 'uploads')
    },
    filename: (req, file, newFile) => {
        const ext = path.extname(file.originalname);
        const id = uuid();
        const img = `images/${id}${ext}`;
        Image.create({ img })
            .then(()=> {
                newFile(null, img);
            })
    }
});

const upload = multer({ storage });

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
//             SEED
//====================================
const recipeSeed = require('../models/seed');

//====================================
//             ROUTES
//====================================
//DELETE ALL
recipeRouter.get('/recipes/delete', (req, res) => {
    Recipe.deleteMany({});
    res.redirect('/')
});

//------------------------------------
//INDEX

recipeRouter.get('/dashboard', isAuthenticated, (req, res) => {
    User.findById(req.session.user, (err, user) => {
        Recipe.find({}).populate('user').exec((err, recipes) =>{
            res.render('dashboard.ejs', { user, recipes });
        });
    });
});


//------------------------------------
//NEW
recipeRouter.get('/new', isAuthenticated, (req, res) => {
        User.find(req.session.user, (err) => {
            console.log(req.session)
            res.render('new.ejs', {
                user: req.session.user,
            });
        });
});
//------------------------------------
//DELETE
//------------------------------------
//UPDATE
//------------------------------------
//CREATE
recipeRouter.post('/new', upload.single('img'), (req, res) => {
    Recipe.create(req.body, (err, newRecipe) => {
        res.redirect('/dashboard')
        console.log(req.body)
    });
});
//------------------------------------
//EDIT
//------------------------------------
//SHOW

//------------------------------------
//EXPORT
module.exports = recipeRouter;