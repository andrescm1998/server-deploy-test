const express = require("express");
const cors = require("cors");

const beasts = require("./beasts");
const logRoute = require("./route-looger");

// Make a basic server
const app = express();

// Allows requests from other origins
app.use((cors()));

//Tell express to always read the body of POST requests
app.use(express.json());

// Add middleware to log routes
app.use(logRoute);

//Set up the server routes

app.get("/", (request, response) => {
    response.send("Welcome to the Bestiary");
});

app.get("/beasts", (request, response) => {
    response.send(beasts)
})

// app.get("/beasts/:name", (req, res) => {
//     const filtered = beasts.filter(beast => beast.name == req.params.name);
//     res.send(filtered[0]);
// })

app.get("/beasts/random", (req, res) => {
    let randomIndex = Math.floor(Math.random()*beasts.length);
    res.send(beasts[randomIndex]);
})

app.get("/beasts/:id", (req, res) => {

    try {
        const id = parseInt(req.params.id);
        //console.log(id);

        if (isNaN(id)) {
            throw "Invalid input!"
        } else if (id < 0 || id >= beasts.length) {
            throw "no such beast!"
        }
        //console.log(id);
        const filtered = beasts.filter(beast => beast.id == id);
        res.send(filtered[0]);
    } catch (e) {
        res.status(400).send({ error: e})
    }

    // const id = Number(req.params.id);

    // if (0 < req.params.id && req.params.id <= beasts.length){
        
    // } else {
        
    // }
})

// app.delete("/beasts/last", (req, res) => {
    
//     try {
//         beasts.pop();
//         res.status(201).send("Last monster was deleted")
//     } catch (error) {
//         res.status(404).send("Something went wrong")
//     }
// })

app.post("/beasts", (req, res) => {
    // Grab the beast data
    const newBeast = req.body;

    // Select an ID for a beast
    newBeast["id"] = beasts.length;

    // Add it to the list of beasts
    beasts.push(newBeast);

    // Return a message saying it worked
    res.status(201).send(newBeast);
})



module.exports = app;
