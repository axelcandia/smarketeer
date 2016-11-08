var config			     = require("../../config/config");
var async         	 = require("async");
var PiwikClient     = require('piwik-client');
var piwik 			    = new PiwikClient(config.piwik.url, config.piwik.token ); 
var FB              = require('fb');
exports.RenderIntegrations = function ( req, res ){   
	piwik.api({
                method:    "SmarketeerIntegrate.GetIntegration",
                idSite:    req.query.idSite,
                source:    "all"
              },function(error,data){  
                console.log(data)
              	 res.render("home/integrations",{
				  	idSite: req.query.idSite, 
				  	integrations:JSON.stringify(data),
            options:null
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
 
 exports.SetFacebookIntegration = function(req,res){
  //Make the call to facebook 
  FB.options({version: 'v2.7'});
  FB.setAccessToken('EAAV4B2gS5pQBAP6ZA4gsW6pHuZBaMhn3lJ6DbJD037juE7ICOiafdeObxbereYKeFoZA0z6oWl0RjMvIMC9vyNlDy4cGfAYdHiZBHsm928R8qaBZCseFU85zTudcZAm1r1ZCQ8z0597rGT5m1g2Chb9ZAiVwKt7VwokZD');
  FB.api('me?fields=adaccounts{account_id,name}', function (faceData) {
  if(!faceData || faceData.error) {
    console.log(!faceData ? 'error occurred' : faceData.error);
    return;
  }
  console.log(req.user);
    piwik.api({
                method:    "SmarketeerIntegrate.GetIntegration",
                idSite:    req.query.idSite,
                source:    "all"
              },function(error,data){  
                console.log(data)
                 res.render("home/setSites",{
                    sites: req.user.websites, 
                    integrations:JSON.stringify(data),
                    options: faceData.adaccounts.data,
                    integrateTo:"facebook" 

                });
            }); 
        });
 }

 exports.SetIntegrationSite = function(req,res){
  piwik.api({
                method:    "SmarketeerIntegrate.SetIntegrationSite",
                idSite:    req.body.idSite,
                source:    req.body.source,
                integrationSite: req.body.integrationSite
              },function(error,data){  
                console.log(error);
                if(!error) res.send(0).status(200);
            }); 
 }