const express = require("express");
const game = express.Router();
const Game = require("../models/game");
const cors = require("cors");

var corsOptions = {
    origin: 'http://172.24.160.144:3000',
    mehtods: "GET,PUT,POST,DELETE",
};

//create a new game
game.post("/create", cors(corsOptions), (req, res) => {
        Game.create(req.body, (error, createdGame) => {
            if (error) {
                res.status(400).json({ error: error.message });
            }
            res.status(200).send(createdGame);
            console.log(createdGame);//  .json() will send proper headers in response so client knows it's json coming back
        });
});

//get all games
game.get("/findAll", cors(corsOptions), async (req, res) => {
    Game.find().then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(400).send({
            message: err.message || "Error Occured"
        });
    });
});

//find a game by its id
game.get('/findOne/:id', cors(corsOptions), (req, res) => {
    const { id } = req.params;
    Game.findOne({id}, (err, data) => {
        if (err) {
            res.status(400).json({ error: error.message});
        } else {
            res.send(data);
        }   
    });
});

//deletes a game by its id
game.delete("/delete/:id", cors(corsOptions), (req, res) => {
    const { id } = req.params;
    Game.remove({id}, (err, data) => {
        if (err) {
            res.status(400).json({ error: error.message});
        } else {
            res.send(data);
        }
    });
});

//update game name
game.put("/updateName/:id", cors(corsOptions), async (req, res) => {
    await Game.findByIdAndUpdate(req.params.id, { name: req.body.name }, (err, p) => {
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

//adds a new player to the players array of the game
game.put("/addPlayer/:gameId", cors(corsOptions), async (req, res) => {
    try{
        Game.findByIdAndUpdate(req.params.gameId, { players: req.body.playerId}, (err, p) => {
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

//changes which player's turn it is 
game.put("/changeTurn/:gameId", cors(corsOptions), async (req, res) => {
    console.log(req.body.playerNum)
    try{
        Game.findByIdAndUpdate(req.params.gameId, { turnNum: req.body.playerNum}, (err, p) => {
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

//adds 1 to the player count
game.put("/updateCount/:id", cors(corsOptions), async (req, res) => {
    Game.findById(req.params.id, (err, data) => {
    if (err) {
        console.log(err)
    } else {
        data.playerCount = data.playerCount + 1

        data.save((err) => {
            if (err) {
              res.status(400).json({ error: error.message});
            } else {
              res.send(data);
            }
        });
    }
  });
});

module.exports = game;