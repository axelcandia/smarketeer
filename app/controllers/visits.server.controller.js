var config					= require("../../config/config");
var google 	  				= require("googleapis");
var OAuth2 					= google.auth.OAuth2;
var oauth2Client			= new OAuth2(config.google.clientID, config.google.clientSecret, config.google.callbackURL);
var AccountInformation     	= require('../models/accountInformation.server.model');
var analytics 				= null;
var visits					= require("./analytics.core.controller");

exports.GetTotalVisits = function (req,res){
	visits.StartAnalytics(req,res);  
	CreateIpDimension(req,res);
}

/***
* @Receives the modelId
* @Receives req, res
* @Return true if it creates a new one
* @Returns DeleteDimension if it was not able due to an error
*/
function CreateIpDimension( req, res ){
	AccountInformation.findOne({ 'items.webProperties.id': "UA-54978711-1" })
	.populate('webProperties.profiles')
	.exec(function(err, locations) {
      if (err) {
        console.log( err );
      }
      else{
      	console.log( locations);
      }
    });
}
/**
* @Receives the ID of dimension to delete
* @Return true if delete == succes
*/
function DeleteDimension( req, res ){

}