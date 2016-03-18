// connect Express
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// add mongoose for mongodb interaction
var mongoose = require('mongoose');

var routes = require('./routes/index');
var users = require('./routes/users');
// add branches route
var branches = require('./routes/branches');
// add auth route
var auth = require('./routes/auth');
// add images route
var images = require('./routes/images');
// auth packages
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');
var localStrategy = require('passport-local').Strategy;

// create an app
var app = express();

// database connection
var db = mongoose.connection;

// show an error if connection fails
db.on('error', console.error.bind(console, 'DB Error: '));
db.once('open', function(callback){
  console.log('Connected to mongodb');
});

// read database connection string from config file
var configDb = require('./config/db.js');
mongoose.connect(configDb.url);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// enable flash for showing messages
app.use(flash());
// passport config section
app.use(session({
  secret: 'lesson8 auth',
  resave: true,
  saveUninitialized: false
}));
// initialize function for passport
app.use(passport.initialize());
// session function for passport
app.use(passport.session());
// use the Account model we built
var Account = require('./models/account');
passport.use(Account.createStrategy());
//// methods for accessing the session data
passport.serializeUser(Account.serializeUser);
passport.deserializeUser(Account.deserializeUser);

app.use('/', routes);
app.use('/users', users);
// map requests at /branches
app.use('/branches', branches);
// map requests at /auth
app.use('/auth', auth);
// map requests at /images
app.use('/images', images);

// error handlers
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// make the app public
module.exports = app;
