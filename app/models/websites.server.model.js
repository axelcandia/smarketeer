var mongoose  = require('mongoose');

var websitesSchema = new mongoose.Schema({
	created 	: Date,
	users   	: [],
	piwik_id	: String, 
	secondId	: String

}); 

var Websites = mongoose.model('Websites', websitesSchema);

module.exports = Websites;