var mongoose = require('mongoose');

//schema for the card
var cardSchema = new mongoose.Schema({
    id: { type: Number, default: 00, required: false },
	value: { type: Number, default: 0, required: false },
	suit: { type: String, default: "Red Hearts", required: false },
	img: { type: String, required: false}
});

module.exports = new mongoose.model('Card', cardSchema);
