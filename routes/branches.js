// connect Express
var express = require('express');
var router = express.Router();

// add mongoose
var mongoose = require('mongoose');

// make this page to refer to the database
var Branch = require('../models/branch');

// set up the GET handler for branches page
router.get('/', function(req, res, next) {
    // use the article model to query the articles collection in the database
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
// GET handler for delete process
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
// GET handler for add page to display a new form
router.get('/add', function(req, res, next) {
    res.render('branches/add', {
        title: 'New Article'
    });
});
// POST handler for add page to process the form
router.post('/add', function(req, res, next) {
    // save a new article using Article model
    Branch.create( {
            number: req.body.number,
            location: req.body.location,
            owner: req.body.owner,
            employees: req.body.employees,
            rate: req.body.rate
        });
    // redirect to manage_directory page
    res.redirect('/branches/manage_directory');
});
// GET handler for edit page to show the populated form
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
// POST handler for edit page to update the article
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
    // use mongoose and Article model to update
    Branch.update({_id: id}, branch, function(err) {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.redirect('/branches/manage_directory');
        }
    });
});


// npm fulltext-engine for searchbar

//var levelQuery = require('level-queryengine'),
//    fulltextEngine = require('fulltext-engine'),
//    levelup = require('levelup'),
//    db = levelQuery(levelup('my-db'));
//
//db.query.use(fulltextEngine());
//
//// index the properties you want (the 'doc' property on objects in this case):
//db.ensureIndex('doc', 'fulltext', fulltextEngine.index());
//
//db.batch(makeSomeData(), function (err) {
//    // will find all objects where 'my' and 'query' are present
//    db.query('doc', 'my query')
//        .on('data', console.log)
//        .on('stats', function (stats) {
//            // stats contains the query statistics in the format
//            //  { indexHits: 1, dataHits: 1, matchHits: 1 });
//        });
//
//    // will find all objects where 'my' OR 'query' are present
//    db.query('doc', 'my query', 'or')
//        .on('data', console.log)
//        .on('stats', function (stats) {
//            // stats contains the query statistics in the format
//            //  { indexHits: 1, dataHits: 1, matchHits: 1 });
//        });
//});

// make public
module.exports = router;