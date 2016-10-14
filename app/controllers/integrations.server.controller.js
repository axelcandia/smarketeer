var config			     = require("../../config/config");
var async          	 	 = require("async");
var PiwikClient     	 = require('piwik-client');
var piwik 			     = new PiwikClient(config.piwik.url, config.piwik.token ); 

exports.RenderIntegrations = function ( req, res ){  
  console.log(req.user);
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
/**
* This prepares the table to receive the token
*/
exports.SetIntegration = function(req,res,next){  
  piwik.api({
                method:    "SmarketeerIntegrate.SetIntegration",
                idSite:    req.query.idSite,
                source:    req.query.source,
                userId:    req.user.email
              },function(error,data){  
                if(error)
                  console.log("End:"+error);
                else
                   next();
              }); 
 			   

}


exports.DeleteIntegration= function(req,res){

} 
 