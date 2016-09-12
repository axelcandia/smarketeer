var mongoose  = require('mongoose');

var formsSchema 		= new mongoose.Schema({
	date   	      		: Date,
	builderCode   		: String,
	html       	  		: String,
	name 		  		: String,
	idSite		  		: String,
	users:[{
		email    		: String,
		_id	     		: Object,
		access   		: String
	}],
	finalAction 		:{
		redirect 		:{
			type 		: Boolean 
		},
		redirectTo 		:{
			type 		:String,
			default 	:"/"
		},
		message 		:{
			type 		:String,
			default 	:"Muchas Gracias!"
		}
	}
	
});

var Forms = mongoose.model('Forms', formsSchema);
module.exports = Forms;
