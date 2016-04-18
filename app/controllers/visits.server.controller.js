var config					     = require("../../config/config");
var google 	  				   = require("googleapis");
var OAuth2 					     = google.auth.OAuth2;
var oauth2Client			   = new OAuth2(config.google.clientID, config.google.clientSecret, config.google.callbackURL);
var CustomDimension     = require('../models/customDimensions.server.model');
var analytics 				   = null;
var visits					     = require("./analytics.core.controller");

exports.GetTotalVisits = function (req,res){
	visits.GetAnalytics(req,res);  
	CreateIpDimension(req,res);
}

/***
* @Receives the modelId
* @Receives req, res
* @Return true if it creates a new one
* @Returns DeleteDimension if it was not able due to an error
*/
function CreateIpDimension( req, res ){

  CustomDimension.findOne({ id: req.user.google}, function(err, existingDimension) {
    if(err)
      console.log("ahooooo");
    if(existingDimension)
      console.log("Everything is awesome");
    else{
      var data = CustomDimension.findOne( { user: "asd" },
                 { pages: { $elemMatch: { _id: "UA2-123123-123123" } } },
                 function(err,data){
                  console.log(JSON.stringify(data.pages[0].dimesionId));
                 });
      
    }
      
  });
}

/**
* @Receives the ID of dimension to delete
* @Return true if delete == succes
*/
function DeleteDimension( req, res ){

}