var mongoose  = require('mongoose');

var visitorsSchema = new mongoose.Schema({
	email   	: String,
	status  	: String,
	piwik_id	: String,
	cookies: [{
		CookieId: String
	}]
});


var Visitors = mongoose.model('Visitors', visitorsSchema);

module.exports = Visitors;