var config					     = require("../../config/config");
var google 	  				   = require("googleapis");
var OAuth2 					     = google.auth.OAuth2;
var oauth2Client			   = new OAuth2(config.google.clientID, config.google.clientSecret, config.google.callbackURL);
var CustomDimension      = require('../models/customDimensions.server.model');
var analytics 				   = require("./analytics.core.controller").analytics;
var GetAnalytics         = require("./analytics.core.controller").GetAnalytics;

exports.GetTotalVisits = function (req,res){
	analytics = GetAnalytics(req,res);  
	GetIpDimension(req,res);
}

/***
* @Receives the modelId
* @Receives req, res
* @Return true if it creates a new one
* @Returns DeleteDimension if it was not able due to an error
*/
function GetIpDimension( req, res ){
  CustomDimension.findOne( {},{ pages: { $elemMatch: { _id: "UA-75241424-1" } } },

    function(err, existingDimension) {
      //Error at searching
      if(err)
        console.log(err);
      //Found element
      if(existingDimension && existingDimension.pages[0] ){
        return existingDimension.pages[0].dimensionId;
      }
      //empty element create it
      else{
        SetIpDimension("UA-75241424-1", function(err,data){
          console.log(data.id);
          SaveIpDimension(data.id);
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
          callback(null,data);
      });

}

function SaveIpDimension(update){
  CustomDimension.findOneAndUpdate(
              { "pages._id": update },
              {$addToSet: {"pages": {_id: update, dimensionId: update.id}}},
              {safe: true, upsert: true},
              function(err, model) {
                  console.log(err);
              }
          );
}
function DeleteIpDimension( req, res ){

}