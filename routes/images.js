// connect express
var express = require('express');
var router = express.Router();

/* GET handler for images page */
router.get('/', function(req, res) {
    res.send('Image Route');
});
/* GET handler for upload page */
router.get('/upload', function(req, res) {
    res.sendfile('./public/html/images-upload.html');
});
/* POST handler for upload page */
router.post('/upload', function(req, res) {
    var multiparty = require("multiparty");
    var form = new multiparty.Form();
    
    form.parse(req, function(err, fields, files) {
        var img = files.images[0];
        var fs = require("fs");
        
        fs.readFile(img.path, function(err, data) {
            var path = "./public/images/" + img.originalFilename;
            
            fs.writeFile(path, data, function(error) {
                if(err) console.log(error);
                res.send("Logo is uploaded successfully");
            });
        });
    });
});

// make public
module.exports = router;