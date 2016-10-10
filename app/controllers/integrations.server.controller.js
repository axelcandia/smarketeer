var config			     = require("../../config/config");
var async          	 	 = require("async");
var PiwikClient     	 = require('piwik-client');
var piwik 			     = new PiwikClient(config.piwik.url, config.piwik.token ); 

exports.RenderIntegrations = function ( req, res ){  
	piwik.api({
                method:    "SmarketeerIntegrate.GetIntegration",
                idSite:    req.query.idSite,
                source:    "all"
              },function(error,data){  
              	 res.render("home/integrations",{
				  	idSite: req.query.idSite, 
				  	integrations:data
				  });
              });  
}

exports.SetIntegration = function(req,res){
 
 			piwik.api({
                method:    "SmarketeerIntegrate.SetIntegration",
                idSite:    req.body.idSite,
                source:    req.body.source, 
                token:     req.body.token
              },function(error,res){
              	console.log(error);
              	console.log(res);
              });   

}
exports.DeleteIntegration= function(reqr,res){

} 