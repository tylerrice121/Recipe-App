//====================================
//             DEPENDENCIES
//====================================
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//------------------------------------
// USER SCHEMA
const imageSchema = Schema({
    img: String,
}, { timestamps: true });

// ------------------------------------
// USER MODEL

module.exports = mongoose.model('Image', imageSchema);