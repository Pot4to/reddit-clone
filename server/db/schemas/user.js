const mongoose = require('mongoose');
const db = require('../index.js');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
    username: String, 
    password: String, 
},
    {
        timestamps: true
    }
);


userSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User', userSchema);

module.exports = User;