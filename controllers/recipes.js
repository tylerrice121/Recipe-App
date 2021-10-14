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
const MQ = require('mediaquery');
const cloudinary = require('cloudinary').v2;



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

recipeRouter.get('/myrecipes', isAuthenticated, (req, res) => {
    User.findById(req.session.user, (err, user) => {
        Recipe.find({}).populate('user').exec((err, recipes) =>{
            res.render('myrecipes.ejs', { user, recipes });
        });
    });
});


//------------------------------------
//NEW
recipeRouter.get('/new', isAuthenticated, (req, res) => {
    User.find(req.session.user, (err) => {

        res.render('new.ejs', {
            user: req.session.user,
            error: '',
        });
    });
});
//------------------------------------
//DELETE
recipeRouter.delete('/recipe/:id', (req, res) => {
    Recipe.findByIdAndDelete(req.params.id, (err, deletedRecipe) => {
        res.redirect('/dashboard')
    });
});
//------------------------------------
//UPDATE


recipeRouter.put('/recipe/:id/edit', (req, res) => {

        Recipe.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        }, (err, updatedRecipe) => {
            res.redirect(`/recipe/${req.params.id}`)
        })

})

recipeRouter.put('/recipe/:id/image', (req, res) => {
    let recipe = Recipe.findById(req.params.id);
    const photo = req.files.imageURL;
    photo.mv(`./uploads/${photo.name}`);
    cloudinary.uploader.destroy(recipe.imageURL);
    cloudinary.uploader.upload(`./uploads/${photo.name}`).then(result => {
        req.body.imageURL = result.secure_url;
        Recipe.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        }, (err, updatedRecipe) => {
            res.redirect(`/recipe/${req.params.id}`)
        })
    })
})

//------------------------------------
//CREATE
recipeRouter.post('/new', (req, res) => {
    if(!req.files) {
        res.render('new.ejs', {user: req.session.user, error: 'Please upload a photo'})

    } else {

        const photo = req.files.imageURL;
        photo.mv(`./uploads/${photo.name}`)
        cloudinary.uploader.upload(`./uploads/${photo.name}`).then(result => {
            req.body.imageURL = result.secure_url;
            Recipe.create(req.body, (err, newRecipe) => {
    
    
                    res.redirect('/dashboard')
                       
            });
        })
    }

});

//------------------------------------
//EDIT

recipeRouter.get('/recipe/:id/edit', (req, res) => {
    Recipe.findById(req.params.id, (err, r) => {
        res.render('edit.ejs', {
            r
        })
    })
})
recipeRouter.get('/recipe/:id/image', (req, res) => {
    Recipe.findById(req.params.id, (err, r) => {
        res.render('newimage.ejs', {
            r
        })
    })
})

//------------------------------------
//SHOW

recipeRouter.get('/recipe/:id', (req, res) => {
    Recipe.findById(req.params.id, (err, r) => {
        res.render('show.ejs', {
            r,
            user: req.session.user
        })
    })
})

//------------------------------------
//EXPORT
module.exports = recipeRouter;