const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email : String,
    password : String,

    CNIC : Number,
    Gender : String,
    dateOfBirth : String,
    contactNo :Number,
    imgURL : String,    
});
module.exports = new mongoose.model("users", userSchema);