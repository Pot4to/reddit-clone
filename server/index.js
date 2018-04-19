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

app.get('/favicon.ico', (req, res) => {
    res.status(200).send();
});

app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUnitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.resolve(__dirname, '../client/dist')));
app.use('/api', router);



const User = require('./db/schemas/user.js');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req, res, next) => {
    res.locals.login = req.isAuthenticated();
    res.locals.thisUser = req.user;
    next();
});


app.post('/api/user/signup', (req, res) => {
    User.register( new User({ username: req.body.username }), req.body.password, function(err, User) {
        if (err) {
            return res.render('register', {user : user});
        }
        passport.authenticate('local')(req, res, function() {
            res.status(201).send('Signed Up');
        });
    })
})

// app.get('/api/user/login/:username/:password', (req, res) => {
//     console.log('In Login Get ...', req.params);
//     passport.authenticate(req.params.username, {
//         successRedirect: `/${req.params.username}/success`,
//         failureRedirect: `/${req.params.username}/failure`
//     })(req, res, function() {
//         console.log('Sucessful Login');
//     });
// });



app.get('/api/user/loggedIn', function(req, res) {
    console.log('In Get LOGGEDIN Success', req.session.passport);
    res.send(req.session.passport);
})

app.post('/api/user/login', passport.authenticate('local'), function(req, res) {
    console.log('In Post Login Success', req.session);
    res.send(req.session);
})

app.get('/api/logout', function(req, res) {
    console.log('BEFORE LOGOUT ', req.session.passport);
    req.logout();
    console.log('AFTER LOGOUT ', req.session.passport);
    res.send('Success');
})



app.use('/api', router);


let PORT = 3000;

app.listen(3000, function() {
    console.log(`Server is listening on ${PORT}`);
})
