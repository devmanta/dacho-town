const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const appRootPath = path.resolve('./');
const staticRootPath = appRootPath + '/public';

const guessPhotoList = require('../../module/games/guess-photo/guessPhotoList');
const guessPhotoAnswerList = require('../../module/games/guess-photo/answerChoiceList');

//URL access
router.get('/', function(req, res){
    res.statusCode = 200;
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


//JSON access
router.get('/question', function(req, res){
    res.statusCode = 200;
    res.send(guessPhotoList);
});
router.get('/answer-choice-list', function(req, res){
    res.statusCode = 200;
    res.send(guessPhotoAnswerList);
});

module.exports = router;