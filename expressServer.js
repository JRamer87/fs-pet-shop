"use strict";

const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.disable('x-powered-by');

app.listen(process.env.PORT || 3000, () => {
    console.log('Listening on port 3000');
});

// GETS ALL THE PETS
app.get('/pets', (req, res) => {
    res.setHeader("Content-Type", "application/json");
    fs.readFile('pets.json', 'UTF8', (err, data) => {
        if (err) {
            throw err;
        }
        res.send(data);
    });
});

// GETS A SPECIFIC PET
app.get('/pets/:pets_id', (req, res) => {
    res.setHeader("Content-Type", "application/json");
    fs.readFile('pets.json', 'UTF8', (err, data) => {
        if (err) {
            throw err;
        }
        let id = JSON.parse(data)[req.params.pets_id];
        if (id === undefined) {
            res.setHeader("Content-Type", "text/plain");
            res.status(404)
                .send('Not Found');
        }
        let pet = JSON.parse(data)[req.params.pets_id];
        res.send(JSON.stringify(pet));
    });
});

// ADDS A NEW PET
app.post('/pets', (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    fs.readFile('pets.json', 'UTF8', (err, data) => {
        if (req.body.name === "" || req.body.kind === "" || req.body.age === "") {
            next();
        } else {
            let pets = JSON.parse(data);
            req.body.age = parseInt(req.body.age);
            let newPet = req.body;
            pets.push(newPet);
            let petsJSON = JSON.stringify(pets);
            fs.writeFile('pets.json', petsJSON, (err) => {
                if (err) {
                    throw err;
                }
                res.send(newPet);
            });
        }
    });
});

//ERROR HANDLING MIDDLEWARE

app.get("/boom", (req, res, next) => {
    next();
});

app.use((req, res, next) => {
    if (req.url === "/boom") {
        res.setHeader("Content-Type", "text/plain");
        res.status(500)
            .send("Internal Server Error");
    } else {
        next();
    }
});

app.use((req, res, next) => {
    if (req.body.name === "" || req.body.kind === "" || req.body.age === "") {
        res.setHeader("Content-Type", "text/plain");
        res.status(400)
            .send('Bad Request');
    } else {
        next();
    }
});

app.use((req, res, next) => {
    res.setHeader("Content-Type", "text/plain");
    res.status(404)
        .send("Not Found");
});


module.exports = app;;
