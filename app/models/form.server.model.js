var mongoose  = require('mongoose');

var formsSchema = new mongoose.Schema({
	date   	      : Date,
	builderCode   : String,
	html       	  : String,
	name 		  : String,
	idSite		  : String,
	users:[{
		email    : String,
		_id	     : Object,
		access   : String
	}]
});

var Forms = mongoose.model('Forms', formsSchema);
module.exports = Forms;
