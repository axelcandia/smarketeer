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
                console.log(data)
              	 res.render("home/integrations",{
				  	idSite: req.query.idSite, 
				  	integrations:JSON.stringify(data)
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
                else{
                  console.log(data);
                   next();
                }
                  
              }); 
 			   

}


exports.DeleteIntegration= function(req,res){ 
    piwik.api({
                method:    "SmarketeerIntegrate.DeleteIntegration",
                idSite:    req.body.idSite,
                source:    req.body.source
              },function(error,data){  
                if(error)
                  console.log("End:"+error);
                else{
                 res.redirect(req.get('referer'));
                }
                  
              });  
} 
 