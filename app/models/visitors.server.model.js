var mongoose  = require('mongoose');

var visitorsSchema = new mongoose.Schema({
	email   		: String,
	status  		: String,
	piwik_id		: String,
	cookies     	: [{
		CookieId: String
	}],
	about         	: {
		type      	: String,
		default   	:  ""
	},
	comments: [{
		user:String,
		text:String,
		image: String,
		date: Date
	}]
});


var Visitors = mongoose.model('Visitors', visitorsSchema);

module.exports = Visitors;