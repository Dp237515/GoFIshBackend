var mongoose = require('mongoose');

//schema for the card
var cardSchema = new mongoose.Schema({
	//what the value of the card is
	value: { type: String, default: "0", required: false },
	//what the suit of the card is
	suit: { type: String, default: "Red Hearts", required: false },
	//a link to an image of the card
	img: { type: String, default: "Needs Image", required: false}
});

module.exports = new mongoose.model('Card', cardSchema);
