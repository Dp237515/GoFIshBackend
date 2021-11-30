var mongoose = require('mongoose');

//schema for the card
var playerSchema = new mongoose.Schema({
	//what the name of the player is
	name: { type: String, default: "Unnamed Player", required: false },
	//what cards the player has
    cards: [String],
	//what the player is doing
	action: { type: String, default: "Waiting", required: false },
	//how many cards the player has in their hand
	cardNum: { type: Number, default: 0, required: false },
	won: { type: Number, default: 0, required: false },
});

module.exports = new mongoose.model('Player', playerSchema);
