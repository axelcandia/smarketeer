var config			= require("../../config/config");
var google 	  		= require("googleapis");
var OAuth2 			= google.auth.OAuth2;
var oauth2Client 	= new OAuth2(config.google.clientID, config.google.clientSecret, config.google.callbackURL);
var analytics 		= StartAnalytics
exports.getHome = function(req, res, next) {
	if (!req.user) { 
		console.log("I have to edit ths later");
	}
	else {
		var analytics= StartAnalytics(req,res);
		
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
* This function will start analytics and make it a global variable
*/
function StartAnalytics(req,res){
	oauth2Client.setCredentials({
	  access_token: req.user.tokens[0].accessToken,
	  refresh_token: req.user.tokens[0].refreshToken,
	  expiry_date: true
	}); 
	return google.analytics({ version: 'v3', auth: oauth2Client }); 
}
 
/**
* @Receives: analytics objetcs,
* @Receives: one profileId,
* @Returns: RealTime Data,
*/
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