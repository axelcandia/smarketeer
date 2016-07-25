var config			= require("../../config/config");
var user 			= require('../models/user.server.model');
var campaign        = require('../models/campaign.server.model');

exports.RenderAdvertisingCosts= function(req, res){ 
	//We find it and send the fields.
	campaign.find({idSite:req.query.idSite},function(err,data){
		console.log("HOLA que tal como te va"+data);
		res.render("home/costs",{ 
	       idSite: req.query.idSite,
	       fields: (data) ? data.fields :  null
	     });
	}) 
} 