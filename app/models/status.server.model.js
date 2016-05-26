var mongoose  = require('mongoose');
var statusSchema = new mongoose.Schema({
	piwikId: String,
	status: String
});

var Status = mongoose.model('Visitor Status', statusSchema);
module.exports = Status;
