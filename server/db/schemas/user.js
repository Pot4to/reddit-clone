const mongoose = require('mongoose');
const db = require('../index.js');
mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
    username: String, 
    password: String, 
},
    {
        timestamps: true
    }
);

module.exports.User = mongoose.model('User', userSchema);