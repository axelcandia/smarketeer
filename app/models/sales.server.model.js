var mongoose  = require('mongoose');

//detail information DAH
var individualDetails= new mongoose.Schema({ 
	"Sub-Total" 		: Number,
	"Tarifa / Precio" 	: Number,
	"Hrs / Cantidad" 	: Number,
	Descripción 		: String,
	Servicio 			: String 
});

var generalInfo = new mongoose.Schema({
	compras 					: [individualDetails],
	    IVA 					: Number,
	    Total 					: Number,
	    SellerName 				: String,
	    ClientEmail 			: String,
	    ClientId  				: String,
	    idSite 	  				: String 
});

var salesSchema = new mongoose.Schema({  
	data 						: generalInfo,
	sellerName 					: String,
	sellerId 					: Object
}); 

var Sales = mongoose.model('Sales', salesSchema);
module.exports = Sales;
