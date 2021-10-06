var mongoose = require('mongoose');

//schema for the card
var gameSchema = new mongoose.Schema({
    //this is the name of the game
    name: { type: String, default: "New Game", required: false },
	//what the playerlist for the game is
	players: [Number]
});

module.exports = new mongoose.model('Game', gameSchema);
