//====================================
//             DEPENDENCIES
//====================================
const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const DATABASE_URL = process.env.DATABASE_URL
const SECRET = process.env.SECRET
const fs = require('fs');
const path = require('path');
const MQ = require('mediaquery');
const expressSession = require('express-session');
const userController = require('./controllers/users');
const indexController = require('./controllers/index');
const recipeController = require('./controllers/recipes');


//====================================
//             DATABASE
//====================================
mongoose.connect(DATABASE_URL);
const db = mongoose.connection;

db.on('connected', () => console.log(`connected to mongodb`));
db.on('disconnected', () => console.log(`disconnected from mongodb`));
db.on('error', () => console.log(`${error.message} mongodb`));
//====================================
//             MIDDLEWARE
//====================================
app.use(express.urlencoded({ extended: false }));

app.use(expressSession({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
    maxAge: 5 * 60 * 60 * 1000
}));

app.use(express.static('public'));
app.use(methodOverride('_method'));

app.use('/', userController);
app.use('/', indexController);
app.use('/', recipeController);



//====================================
//             ROUTES
//====================================


//====================================
//             LISTENER
//====================================
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on port ${port}`)
});