const express = require("express");
const card = express.Router();
const Card = require("../models/card");
const cors = require("cors");

var corsOptions = {
    origin: 'http://localhost:3000'
};

//create a new card
card.post("/create", cors(corsOptions), (req, res) => {
    Card.create(req.body, (error, createdCard) => {
        if (error) {
            res.status(400).json({ error: error.message });
        }
        res.status(200).send(createdCard);
        console.log(createdCard);//  .json() will send proper headers in response so client knows it's json coming back
    });
});

//get all cards
card.get("/findAll", cors(corsOptions), async (req, res) => {
    Card.find().then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(400).send({
            message: err.message || "Error Occured"
        });
    });
});

//find a card by its id
card.get('/findOne/:id', cors(corsOptions), (req, res) => {
    const { id } = req.params;
    Card.findOne({id}, (err, data) => {
        if (err) {
            res.status(400).json({ error: error.message});
        } else {
            res.send(data);
        }   
    });
});

//deletes a card by its id
card.delete("/delete/:id", cors(corsOptions), (req, res) => {
    const { id } = req.params;
    Card.remove({id}, (err, data) => {
        if (err) {
            res.status(400).json({ error: error.message});
        } else {
            res.send(data);
        }
    });
});

module.exports = card;