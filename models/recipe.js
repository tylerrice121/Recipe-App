//====================================
//             DEPENDENCIES
//====================================
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//------------------------------------
// RECIPE SCHEMA
const imageSchema = Schema({
    img: String,
}, { timestamps: true });


const recipeSchema = Schema({
    title: String,
    description: String,
    imgFile: { 
        type: Schema.Types.ObjectId,
        ref: 'Image'
    },
    ingredients: String,
    steps: String,
    user: { 
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    cookTime: Number,
    prepTime: Number
    
}, { timestamps: true });

//------------------------------------
// USER MODEL
module.exports = mongoose.model('Recipe', recipeSchema);