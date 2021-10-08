const express = require('express');
const User = require('../models/user');
const indexRouter = express.Router();

//====================================
//             ROUTES
//====================================
//------------------------------------
//INDEX
indexRouter.get('/', (req, res) => {
    console.log(req.session)
    res.render('home.ejs', {user: req.session.user});
});


//------------------------------------
//NEW
//------------------------------------
//DELETE
//------------------------------------
//UPDATE
//------------------------------------
//CREATE
//------------------------------------
//EDIT
//------------------------------------
//SHOW


module.exports = indexRouter;