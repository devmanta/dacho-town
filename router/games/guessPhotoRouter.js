const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const appRootPath = path.resolve('./');
const staticRootPath = appRootPath + '/public';

router.get('/', function(req, res){
    res.statusCode = 200;
    // res.send('got it!');
    res.setHeader('Content-Type', 'text/html');
    fs.readFile(staticRootPath + '/html/games/guess-photo/index.html', function(err, data){
        if(err){
            res.statusCode = 404;
            res.write('Something Wrong!');
        }else{
            res.write(data);
        }
        res.end();
    });
});

module.exports = router;