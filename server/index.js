const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./routes/routes.js');
const session = require('express-session');
const db = require('./db/index.js')
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const FileStore = require('session-file-store')(session);
const uuid = require('uuid');
const passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUnitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.resolve(__dirname, '../client/dist')));
app.use('/api', router);

const User = require('./db/schemas/user.js');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());






app.get('/api/comments/*', (req, res) => {
    db.recursiveGetComments(req.url.slice(14), (err, data) => {
        if (err) return res.status(404).send();
        res.status(200).send(data);
    })
});

app.post('/api/user/signup', (req, res) => {
    User.register( new User({ username: req.body.username }), req.body.password, function(err, User) {
        if (err) {
            return res.render('register', {user : user});
        }
        passport.authenticate('local')(req, res, function() {
            console.log('success');
        });
    })
})
 
app.get('/api/user/login/:username/:password', (req, res) => {
    // console.log('Here in login GET')
    console.log('In Login Get ...', req.params);
    
    // res.render('login', {user : req.username});
    passport.authenticate(req.params.username, {
        successRedirect: `/${req.params.username}/success`,
        failureRedirect: `/${req.params.username}/failure`
    })(req, res, function() {
        console.log('Sucessful Login');
    });
});

app.post('/api/user/login/:username/:password', passport.authenticate('local'), function(req, res) {
    
})






let PORT = 3000;

app.listen(3000, function() {
    console.log(`Server is listening on ${PORT}`);
})
