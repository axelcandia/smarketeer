var config			= require("../../config/config");
var google 	  		= require("googleapis");
var OAuth2 			= google.auth.OAuth2;
var oauth2Client 	= new OAuth2( config.google.clientID, config.google.clientSecret, config.google.callbackURL );
var analytics 		= null;
var GetAnalytics 	= require("./analytics.core.controller").GetAnalytics;

exports.getHome = function(req, res, next) {
	if (!req.user) { 
		console.log("I have to edit ths later");
	}
	else { 

		analytics = GetAnalytics(req,res);
		
		analytics.management.accountSummaries.list(function(err,data){
			if(err)
				//Return error view
				console.log(err)
			else{
				res.render('home', {
				    items: data.items
				  });
			}
				
		})
	}
};
 
/**
* @Receives: analytics objetcs,
* @Receives: one profileId,
* @Returns: RealTime Data,
**/
function GetRealTimeData(analytics, profileId){
	var params = {
		"ids":"ga:"+profileId,
		"metrics":"rt:activeUsers"
	}; 

	analytics.data.realtime.get(params, function(err,data){
		if(err)
			console.log(err);
		else
			console.log(JSON.stringify(data));
	})
}
//TODO: This will catch the error and send the appropiate action/window
function errorParser(){

}
//TODO si el length es mayor a uno en getGaViewProfile significa que uno tiene mas de 1 subvistas,
// despues tenemos que ver como se arregla este temea