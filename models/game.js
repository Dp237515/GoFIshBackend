var mongoose = require('mongoose');

//schema for the card
var gameSchema = new mongoose.Schema({
    //this is the name of the game
    name: { type: String, default: "New Game", required: false },
	//what the playerlist for the game is
	players: [String],
    //what the playerlist for the game is
	playerCount: { type: Number, default: 0, required: false },
    //if someone has won the game
	condition: { type: Boolean, default: false, required: false },
    //keeps track of which player's turn it is
    turnNum: { type: Number, default: 0, required: false }
});

module.exports = new mongoose.model('Game', gameSchema);
