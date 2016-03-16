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
// auth packages
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');
var localStrategy = require('passport-local').Strategy;

// add the branches route
var branches = require('./routes/branches');

// add auth connection
var auth = require('./routes/auth');

// create an app
var app = express();

// db connection
var db = mongoose.connection;

// show an error if connection fails (line 23 - 27 is just for testing)
db.on('error', console.error.bind(console, 'DB Error: '));
db.once('open', function(callback){
  console.log('Connected to mongodb');
});

// connect to local
//mongoose.connect('mongodb://localhost/test');

// connect to mlab
//mongoose.connect('mongodb://200283481:920222@ds064278.mlab.com:64278/200283481');

// read db connection string from our config file
var configDb = require('./config/db.js');
mongoose.connect(configDb.url);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//// enable flash for showing messages
//app.use(flash());
//// passport config section
//app.use(session({
//  secret: 'lesson8 auth',
//  resave: true,
//  saveUninitialized: false
//}));
//////////////////////////
//app.use(passport.initialize());
//////////////////////////
//app.use(passport.session());
//// use the Account model we built
//var Account = require('./models/account');
////passport.createStrategy(Account.createStrategy);
////// methods for accessing the session data
////passport.serializeUser(Account.serializeUser);

app.use('/', routes);
app.use('/users', users);
//map requests at /branches to use he routes/branches.js file
app.use('/branches', branches);
// map requests at /auth
app.use('/auth', auth);


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


module.exports = app;
