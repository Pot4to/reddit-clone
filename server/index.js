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
const fileUpload = require('express-fileupload');
const cors = require('cors');

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', router);

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

app.get('/api/user/loggedIn', function(req, res) {
    res.send(req.session.passport);
})

app.post('/api/user/login', passport.authenticate('local'), function(req, res) {
    res.send(req.session);
})

app.get('/api/logout', function(req, res) {
    req.logout();
    res.send('Success');
})

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload());
app.use('/public', express.static(__dirname + '/public'));


app.post('/upload', (req, res, next) => {
  console.log(req);
  let imageFile = req.files.file;

  imageFile.mv(`${__dirname}/public/${req.body.filename}.jpg`, function(err) {
    if (err) {
      return res.status(500).send(err);
    }

    res.json({file: `public/${req.body.filename}.jpg`});
  });

})

// app.use('/api', router);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
})

let port = process.env.PORT || 3000;

app.listen(port, function () {
    // var port = app.address().port;
    console.log(`App now running on port ${port}`);
});
