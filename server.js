//====================================
//             DEPENDENCIES
//====================================
const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const expressSession = require('express-session');
const userController = require('./controllers/users');
const indexController = require('./controllers/index');
const recipeController = require('./controllers/recipes');
const cloudinary = require('cloudinary').v2;
const expressFileUpload = require('express-fileupload');


const {DATABASE_URL, PORT, SECRET, API_KEY, API_SECRET, CLOUD_NAME} = process.env

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
cloudinary.config({ 
    cloud_name: CLOUD_NAME, 
    api_key: API_KEY, 
    api_secret: API_SECRET 
 });

app.use(express.urlencoded({ extended: false }));

app.use(expressSession({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
    maxAge: 5 * 60 * 60 * 1000
}));

app.use(express.static('public'));
app.use(expressFileUpload({ createParentPath: true }));
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
const port = PORT || 3000;
app.listen(port, () => {
    console.log(`listening on port ${port}`)
});