var mongoose  = require('mongoose');

var salesSchema = new mongoose.Schema({  
	data: { 
	    "compras" : [ 
	        {
	            "Sub-Total" : Number,
	            "Tarifa / Precio" : Number,
	            "Hrs / Cantidad" : Number,
	            "Descripción" : String,
	            "Servicio" : String
	        }
	    ],
	    "IVA" : Number,
	    "Total" : Number,
	    "SellerName" : String,
	    "ClientEmail" : String,
	    "ClientId" : String,
	    "idSite" : String 

	},
	sellerName:String,
	sellerId:Object
});

var Sales = mongoose.model('Sales', salesSchema);
module.exports = Sales;
