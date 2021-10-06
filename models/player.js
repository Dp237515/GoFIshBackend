var mongoose = require('mongoose');

//schema for the card
var playerSchema = new mongoose.Schema({
	//what the name of the player is
	name: { type: String, default: "Unnamed Player", required: false },
	//what cards the player has
    cards: [Number]
});

module.exports = new mongoose.model('Player', playerSchema);
