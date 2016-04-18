var config					     = require("../../config/config");
var google 	  				   = require("googleapis");
var OAuth2 					     = google.auth.OAuth2;
var oauth2Client			   = new OAuth2(config.google.clientID, config.google.clientSecret, config.google.callbackURL);
var CustomDimension     = require('../models/customDimensions.server.model');
var analytics 				   = null;
var visits					     = require("./analytics.core.controller");

exports.GetTotalVisits = function (req,res){
	visits.GetAnalytics(req,res);  
	GetIpDimension(req,res);
}

/***
* @Receives the modelId
* @Receives req, res
* @Return true if it creates a new one
* @Returns DeleteDimension if it was not able due to an error
*/
function GetIpDimension( req, res ){

  CustomDimension.findOne({},
                 { pages: { $elemMatch: { _id: "UA2-123123-123123" } } },
                function(err, existingDimension) {
    if(err)
      console.log("WE HAVE AN ERROR BUUUUUUU");
    if(existingDimension){
       if(existingDimension.pages[0].dimensionId)
          return existingDimension.pages[0].dimensionId;
       else
        //Create a new dimension and push it in current status
        SetIpDimension(existingDimension.pages[0].dimensionId, function(err,data){
          console.log(data);
        })
    } 
      
  });
}
/**
* @Receives: WebPropertyId
* @Medium:   Parse the webProperty into accountId and make the insert
* @Returns: If err
*              return err 
*          else execute callback
*/
function SetIpDimension( webProperty,callback ){
  console.log(webProperty);
  var account = webProperty.split("-");
  var params={
        "accountId":account[1],
        "webPropertyId":webProperty,
        "resource":{
          "name":"AIPs",
          "scope":"USER",
          "active":true
        }
      };
      //Insert the new customDimension
      analytics.management.customDimensions.insert(params, function(err,data){
        if(err) console.log(err)
        else
          console.log(data);
          callback(null,data);
      });

}
function SaveIpDimension( ){

}
function DeleteIpDimension( req, res ){

}