/* Connect Express */
var express = require('express');
var router = express.Router();

/* GET introduction page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CAFE ALBERO' });
});

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('home', { title: 'CAFE ALBERO' });
});
/* Show the page */
module.exports = router;
