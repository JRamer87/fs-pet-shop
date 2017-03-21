"use strict";

const fs = require("fs");

let method = process.argv[2];
let index = process.argv[3];
let age = Number.parseInt(process.argv[3]);
let kind = process.argv[4];
let name = process.argv[5];

//THROWS AN ERROR IF PROPER CONVENTION ISN'T USED
function usage() {
    if (process.argv.length <= 2) {
        console.error("Usage: node pets.js [read | create | update | destroy]");
        process.exitCode = 1;
    }
}
usage();


//READS THE ENTIRE JSON FILE
function read() {
    if (method === "read" && !index) {
        fs.readFile('pets.json', (err, data) => {
            if (err) {
                throw err;
            }
            console.log(JSON.parse(data));
        });
    }
}
read();

//READS A SPECIFIC INDEX IN THE JSON FILE
function readIndex() {
    if (method === "read" && index) {
        fs.readFile('pets.json', (err, data) => {
            if (err) {
                throw err;
            }
            let parsedData = JSON.parse(data);
            if (parsedData[index] === undefined) {
                console.error(`Please enter an index between 0 and ${parsedData.length}`);
                process.exitCode = 1;
            } else {
                console.log(parsedData[index]);
            }
        });
    }
}
readIndex();


//CREATES A NEW PET
function createPet() {
    if (method === "create") {
        if (Number.isNaN(age) || !age || !kind || !name || process.argv.length <= 2) {
            console.error("Usage: node pets.js create AGE KIND NAME");
            process.exitCode = 1;
        } else if (method = "create" && age && kind && name) {
            fs.readFile('pets.json', (err, data) => {
                if (err) {
                    throw err;
                }
                var pets = JSON.parse(data);
                var newPet = {};
                newPet.age = Number(process.argv[3]);
                newPet.kind = process.argv[4];
                newPet.name = process.argv[5];
                pets.push(newPet);

                var petsJSON = JSON.stringify(pets);

                fs.writeFile('pets.json', petsJSON, (err, data) => {
                    if (err) {
                        throw err;
                    }
                    console.log(newPet);
                });
            });
        }
    }
}
createPet();

//UPDATES PET INFO AT A SPECIFIC INDEX
function updatePet() {
    if (method === "update") {
        if (Number.isNaN(age) || !index || !age || !kind || !name || process.argv.length <= 2) {
            console.error("Usage: node pets.js create AGE KIND NAME");
            process.exitCode = 1;
        } else if (method = "update" && index && age && kind && name) {
            fs.readFile('pets.json', (err, data) => {
                if (err) {
                    throw err;
                }
                var pets = JSON.parse(data);
                pets[index].age = Number(process.argv[3]);
                pets[index].kind = process.argv[4];
                pets[index].name = process.argv[5];

                var petsJSON = JSON.stringify(pets);

                fs.writeFile('pets.json', petsJSON, (err, data) => {
                    if (err) {
                        throw err;
                    }
                    console.log(pets[index]);
                });
            });
        }
    }
}
updatePet();

function destroyPet() {
    if (method === "destroy") {
        if (!index || process.argv.length <= 2) {
            console.error("Usage: node pets.js create AGE KIND NAME");
            process.exitCode = 1;
        } else if (method = "destroy" && index) {
            fs.readFile('pets.json', (err, data) => {
                if (err) {
                    throw err;
                }
                var pets = JSON.parse(data);
                console.log(pets[index]);
                pets.splice(index, 1);

                var petsJSON = JSON.stringify(pets);

                fs.writeFile('pets.json', petsJSON, (err, data) => {
                    if (err) {
                        throw err;
                    }
                });
            });
        }
    }
}
destroyPet();
