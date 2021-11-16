var mongoose = require('mongoose');

//schema for the card
var playerSchema = new mongoose.Schema({
	//what the name of the player is
	name: { type: String, default: "Unnamed Player", required: false },
	//what cards the player has
    cards: [Number],
	//what the player is doing
	action: { type: String, default: "Waiting", required: false },
});

module.exports = new mongoose.model('Player', playerSchema);
