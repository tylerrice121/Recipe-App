//====================================
//             DEPENDENCIES
//====================================
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//------------------------------------

const recipeSchema = Schema({
    title: {type: String, required: true},
    description: String,
    extLink: String,
    linkName: String,
    imageURL: {type: String, default:'/images/Brie-and-Cheddar-Apple-Beer-Soup-1.jpeg', required: true},
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