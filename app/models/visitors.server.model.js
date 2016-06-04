var mongoose  = require('mongoose');

var visitorsSchema = new mongoose.Schema({
	cookies :[],
	email   : String,
	status  : String
});


var Visitors = mongoose.model('Visitors', visitorsSchema);

module.exports = Visitors;