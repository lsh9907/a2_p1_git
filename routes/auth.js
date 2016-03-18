// connect Express
var express = require('express');
var router = express.Router();

// add auth package refs
var passport = require('passport');
var mongoose = require('mongoose');
var Account = require('../models/account');

// GET register - show registration form
router.get('/register', function(req,res,next) {
    res.render('auth/register', {
        title: 'Register'
    });
});
// POST register - save new user
router.post('/register', function(req, res, next) {
    /* Try to create a new account using our Account model & the form values
     * If we get an error, display the register form again
     * If registration works, store the user and show the articles main page */
    Account.register(new Account({ username: req.body.username }), req.body.password, function(err, account) {
        if (err) {
            res.render('auth/register', {
                title: 'Register'
            });
        }
        else {
            req.login(account, function(err) {
                res.redirect('/branches');
            });
        }
    });
});
// GET login - show login form
router.get('/login', function(req,res,next) {
    // store the session messages in a local variable
    var messages = req.session.messages || [];
    // clear the session messages
    req.session.messages = [];
    // show the login page and pass in any messages we may have
    res.render('auth/login', {
        title: 'Login',
        user: req.user,
        messages: messages
    });
});
// POST login - validate user
router.post('/login', passport.authenticate('local', {
    successRedirect: '/branches',
    failureRedirect: '/auth/login',
    failureMessage: 'Invalid Login'
}));
//make this public
module.exports = router;