//====================================
//             DEPENDENCIES
//====================================
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//------------------------------------

const recipeSchema = Schema({
    title: String,
    description: String,
    extLink: String,
    linkName: String,
    img: String,
    ingredients: Array,
    steps: Array,
    restrictions: String,
    mealType: String,
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