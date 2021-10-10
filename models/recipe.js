//====================================
//             DEPENDENCIES
//====================================
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//------------------------------------

const recipeSchema = Schema({
    title: String,
    description: String,
    img: String,
    ingredients: String,
    steps: String,
    user: { 
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    cookTime: Number,
    prepTime: Number,
    tags: String
    
}, { timestamps: true });

//------------------------------------
// USER MODEL
module.exports = mongoose.model('Recipe', recipeSchema);