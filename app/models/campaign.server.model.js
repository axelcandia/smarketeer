var mongoose  = require('mongoose');
var campaignSchema = new mongoose.Schema({
	websiteUrl : String,
	campaign   : String,
	source     : String,
	medium     : String,
	keywords   : String,
	content    : String,
	url        : String,
	idSite	   : String,
	users:[{
		email : String,
		_id	   : Object,
	}],
	creado: Date
});

var Campaign = mongoose.model('Campaign', campaignSchema);
module.exports = Campaign;
