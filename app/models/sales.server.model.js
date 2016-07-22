var mongoose  = require('mongoose');

var salesSchema = new mongoose.Schema({  
	data: Object,
	sellerName:String,
	sellerId:Object
});

var Sales = mongoose.model('Sales', salesSchema);
module.exports = Sales;
