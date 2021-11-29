const express = require("express");
const player = express.Router();
const Player = require("../models/player");
const cors = require("cors");

var corsOptions = {
    origin: 'http://192.168.1.138:3000',
    mehtods: "GET,PUT,POST,DELETE",
};

//create a new player
player.post("/create", cors(corsOptions), (req, res) => {
    Player.create(req.body, (error, createdPlayer) => {
        if (error) {
            res.status(400).json({ error: error.message });
        }
        res.status(200).send(createdPlayer);
        console.log(createdPlayer);//  .json() will send proper headers in response so client knows it's json coming back
    });
});

//get all players
player.get("/findAll", cors(corsOptions), async (req, res) => {
    Player.find().then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(400).send({
            message: err.message || "Error Occured"
        });
    });
});

//find a player by its id
player.get('/findOne/:id', cors(corsOptions), (req, res) => {
    const { id } = req.params;
    Player.findOne({id}, (err, data) => {
        if (err) {
            res.status(400).json({ error: error.message});
        } else {
            res.send(data);
        }   
    });
});

//deletes a player by its id
player.delete("/delete/:id", cors(corsOptions), (req, res) => {
    const { id } = req.params;
    Player.remove({id}, (err, data) => {
        if (err) {
            res.status(400).json({ error: error.message});
        } else {
            res.send(data);
        }
    });
});

//update player name
player.put("/updateName/:id", cors(corsOptions), async (req, res) => {
    await Player.findByIdAndUpdate(req.params.id, { name: req.body.name }, (err, p) => {
        if (!p) {
            return next(new Error('DNE'));
        } else {
            p.save((err) => {
                if (err) {
                    res.status(400).json({ error: error.message});
                } else {
                    res.send(p);
                }
            });
        }
    });
});

//adds a new card to the cards array of the player
player.put("/addCard/:gameId", cors(corsOptions), async (req, res) => {
    try{
        Player.findByIdAndUpdate(req.params.gameId, { cards: req.body.card}, (err, p) => {
            if(!p){
                return next(new Error('DNE'))
            } else {
                p.save((err) => {
                    if (err) {
                        res.status(400).json({ error: error.message});
                    } else {
                        res.send(p);
                    }
                })
            }
        })
    } catch (err) {
        console.log(err)
    }    
});

module.exports = player;