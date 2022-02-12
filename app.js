const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(express.static('public'));

console.log(__dirname);

const guessPhotoRouter = require('./router/games/guessPhotoRouter.js');
app.use('/games/guess-photo', guessPhotoRouter);

app.get('/', function(req, res){
    console.log(__dirname);
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    fs.readFile('index.html', function(err, data){
        if(err){
            res.writeHead(404);
            res.write('Something Wrong!');
        }else{
            res.write(data);
        }
        res.end();
    });
});

app.get('/test', function(req, res){
    console.log("TESTING....");
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    fs.readFile('test.html', function(err, data){
        if(err){
            res.writeHead(404);
            res.write('Something Wrong!');
        }else{
            res.write(data);
        }
        res.end();
    });
});

app.listen(3000, ()=>{
    console.log('Listening at 3000');
})