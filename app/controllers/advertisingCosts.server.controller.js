var config			= require("../../config/config");
var user 			= require('../models/user.server.model');
var AdvertisingCost = require('../models/advertisingCost.server.model');

exports.RenderAdvertisingCosts= function(req, res){
	if (!req.user) { 
		res.redirect("/login");
	}
	//We find it and send the fields.
	AdvertisingCost.findOne({idSite:req.query.idSite},function(err,data){
		
		res.render("home/costs",{ 
	       idSite: req.query.idSite,
	       fields: (data) ? data.fields :  null
	     });
	})
	 
	//
}
/**
*We Update or create the new advertising costs
*/
exports.SetAdvertisingCosts = function(req,res,next){ 

	console.log(req.body); 

	//Update by idSite
	var query = { "idSite" : req.body.idSite };
	//Fields to update
	var update = { 
	    	"fields"			: req.body.fields
	    };

	var options = { upsert: true, new: true, setDefaultsOnInsert: true };

	AdvertisingCost.findOneAndUpdate( query, update, options, function(error, result) {
		if(error){
			console.log(error);
		}
		else{
			res.send( result._id );
		}
	});


}