var config			     = require("../../config/config");
var async         	 = require("async");
var PiwikClient     = require('piwik-client');
var piwik 			    = new PiwikClient(config.piwik.url, config.piwik.token ); 
var FB              = require('fb');
var HubspotClient   = require('hubspot');
FB.options({'appSecret': config.facebook.clientSecret});
FB.options({version: 'v2.8'});
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
                idSite:    req.body.idSite,
                source:    req.body.source,
                userId:    req.body.userId,
                token:     req.body.token,
                integrationSite: req.body.integrationSite
              },function(error,data){  
                if(error)
                  console.log("End:"+error);
                else{
                  console.log(data);
                  res.send(200);
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
 
 exports.RenderSetPageIntegration = function(req,res){   

  var token = req.session['token'] ; 
  switch(req.session['source']){

    case "facebook":
           FB.setAccessToken(token);
            FB.api('me?fields=adaccounts{account_id,name}', function (faceData) {
              if(!faceData || faceData.error) {
                console.log(!faceData ? 'error occurred' : faceData.error);
                  return;
                }
              RenderIntegration(req,res,faceData.adaccounts.data)
             
           });   
        break;

    case "hubspot":

      break;
    break;
  }
 
 } 
function RenderIntegration(req,res,options){
   res.render("home/setSites",{
                    sites: req.user.websites, 
                    options: options,
                    integrateTo:req.session['source'],
                    token:token

                });

}
 exports.trash = function (req,res){
  var hubspotClient = new HubspotClient();
  hubspotClient.useToken("2f11f868-9923-48c5-99f1-bab52fffa964"); 
  hubspotClient.contacts.get(function(err,data,res){
    if(err){
      console.log(err);
    }
    console.log(data);
  });
  /*FB.setAccessToken('EAAV4B2gS5pQBAP6ZA4gsW6pHuZBaMhn3lJ6DbJD037juE7ICOiafdeObxbereYKeFoZA0z6oWl0RjMvIMC9vyNlDy4cGfAYdHiZBHsm928R8qaBZCseFU85zTudcZAm1r1ZCQ8z0597rGT5m1g2Chb9ZAiVwKt7VwokZD');
  FB.api('/act_42417167/adsets', function (faceData) {
  if(!faceData || faceData.error) {
    console.log(!faceData ? 'error occurred' : faceData.error);
    return;
  }
  console.log(faceData);

  });
  */
  //GET EVERY DATAAH
}

 exports.hubspotwebhook = function(req,res){  
    //WiF CREATES A NEW VISITOR
    //IF CHANGES A STATUS
    console.log(req);
  }
