var mongoose  = require('mongoose');
var campaignSchema = new mongoose.Schema({ 
	url 	   : String,
	campaign   : String,
	source     : String,
	medium     : String,
	term	   : String,
	content    : String,
	url        : String,
	total      : Number,
	idSite	   : String,
	from	   : Date,
	to 		   : Date, 
});

var Campaign = mongoose.model('Campaign', campaignSchema);
module.exports = Campaign;
