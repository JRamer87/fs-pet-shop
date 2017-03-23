"use strict";

const fs = require('fs');
const http = require('http');

var server = http.createServer(function(req, res) {
    console.log(req.url);
    let index = req.url.split('/')[2];
    let urlLength = req.url.split('')
        .length;
    if (req.method === 'GET' && req.url === '/pets') {
        res.setHeader('Content-Type', 'application/json	');
        fs.readFile('pets.json', 'utf8', (err, data) => {
            res.end(data);
        });
    } else if (req.method === 'GET' && urlLength > 6) {
        res.setHeader('Content-Type', 'application/json');
        fs.readFile('pets.json', 'utf8', (err, data) => {
            let pet = JSON.parse(data)[index];
            if (pet === undefined) {
                res.setHeader('Content-Type', 'text/plain');
                res.statusCode = 404;
                res.end("Not Found");
            }
            console.log(pet);
            res.end(JSON.stringify(pet));
        });
    }
});




server.listen(process.env.PORT || 3000);
module.exports = server;
