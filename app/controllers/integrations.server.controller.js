var async           = require("async");

exports.RenderIntegrations = function ( req,res ){ 
	  res.render("home/integrations",{
	  	idSite: req.query.idSite
	  });  
}