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
