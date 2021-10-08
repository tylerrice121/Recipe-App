//====================================
//             DEPENDENCIES
//====================================
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//------------------------------------
// USER SCHEMA
const userSchema = Schema({
    email: { type: String, unique: true, required: true },
    username: String,
    password: { type: String, required: true },
    isAuthor: { type: Boolean, default: true }
}, { timestamps: true });

//------------------------------------
// USER MODEL
module.exports = mongoose.model('User', userSchema);