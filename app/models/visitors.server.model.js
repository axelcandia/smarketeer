var mongoose  = require('mongoose');

var visitorsSchema = new mongoose.Schema({
	email   		: String,
	status  		: String,
	userId			: String, 
	about         	: {
		type      	: String,
		default   	:  ""
	},
	comments		: [{
		userId 		: String,
		text 		: String,
		image 		: String,
		date 		: Date,
		userName	: String 
	}]
});


var Visitors = mongoose.model('Visitors', visitorsSchema);

module.exports = Visitors;