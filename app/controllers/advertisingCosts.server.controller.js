var config			= require("../../config/config");
var user 			= require('../models/user.server.model');

exports.RenderAdvertisingCosts= function(req, res){
	if (!req.user) { 
		res.redirect("/login");
	}

	res.render("home/costs",{ 
       idSite: req.query.idSite,
      }); 
	//
}