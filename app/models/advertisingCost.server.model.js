var mongoose  = require('mongoose');
var advertisingCostSchema = new mongoose.Schema({
	idSite: String,
	fields: Object
});

var advertisingCost = mongoose.model('Advertising Costs', advertisingCostSchema);
module.exports = advertisingCost;
