var express = require('express');
var router = express.Router();

// add mongoose
var mongoose = require('mongoose');

// make this page to refer to the database
var Branch = require('../models/branch');

// Set up the get handler for the main articles page
router.get('/', function(req, res, next) {
    // use the article model to query the articles collection in the db
    Branch.find(function(err, branches) {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.render('branches', {
                title: 'Branches Directory',
                branches: branches
            });

        }
    })
});
// GET handler for manage_directory page
router.get('/manage_directory', function(req, res, next) {
    Branch.find(function(err, branches) {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.render('branches/manage_directory', {
                title: 'Manage Directory',
                branches: branches
            });

        }
    })
});
router.get('/delete/:id', function(req, res, next) {
    // grab the id parameter from the url
    var id = req.params.id;

    Branch.remove({_id: id}, function(err) {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            // show updated articles list
            res.redirect('/branches/manage_directory');
        }
    });
});
// GET handler for add to display a blank form
router.get('/add', function(req, res, next) {
    res.render('branches/add', {
        title: 'New Article'
    });
});
// POST handler for add to process the form
router.post('/add', function(req, res, next) {
    // save a new article using our Article model
    Branch.create( {
            number: req.body.number,
            location: req.body.location,
            owner: req.body.owner,
            employees: req.body.employees,
            rate: req.body.rate
        });
    // redirect to main articles page
    res.redirect('/branches/manage_directory');
});
// GET handler for edit to show the populated form
router.get('/:id', function(req, res, next) { // we make an id
    // create an id variable to store the id from the url
    var id = req.params.id;

    // look up the selected article
    Branch.findById(id, function (err, branch) {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            // show the edit view
            res.render('branches/edit', {
                title: 'Article Details',
                branch: branch
            });
        }
    });
});
// POST handler for edit to update the article
router.post('/:id', function(req, res, next) {
    // create an id variable to store the id from the url
    var id = req.params.id;

    // fill the article object
    var branch = new Branch({
        _id: id,
        number: req.body.number,
        location: req.body.location,
        owner: req.body.owner,
        employees: req.body.employees,
        rate: req.body.rate
    });

    // use mongoose and our Article model to update
    Branch.update({_id: id}, branch, function(err) {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.redirect('/branches/manage_directory');
        }
    });
});
// make public
module.exports = router;