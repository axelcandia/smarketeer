var mongoose  = require('mongoose');

var solvedforms = new mongoose.Schema({
	date 	: Date,
	fields 	: Object,
	userId	: String		
});

var solvedforms = mongoose.model('Solved Forms', solvedforms);
module.exports = solvedforms;
