var config					= require("../../config/config");
var google 	  				= require("googleapis");
var OAuth2 					= google.auth.OAuth2;
var oauth2Client			= new OAuth2(config.google.clientID, config.google.clientSecret, config.google.callbackURL);
var AccountInformation     	= require('../models/accountInformation.server.model');
var analytics 				= null;

/**
* Gets the token and starts the analytics appropiate to that account
*/
exports.StartAnalytics= function(req,res){
	oauth2Client.setCredentials({
	  access_token: req.user.tokens[0].accessToken,
	  refresh_token: req.user.tokens[0].refreshToken,
	  expiry_date: true
	});
	if(analytics == null)
		analytics= google.analytics({ version: 'v3', auth: oauth2Client }); 
	return true;
}

/**
* Returns the view with biggest visits and the number of total visits
*/
exports.GetDashboardVisits = function (req,res){
	StartAnalytics(req,res);  
	analytics.management.accountSummaries.list(function(err,data){
			if(err) 
				console.log(err)
			else{ 
				 CreateAccountInformation(res,data); 
			}
	
	});
}
/***
*
*/
exports.GetViewsPanel = function (req,res){
	StartAnalytics(req,res);
	var params = {
			"dimensions":"ga:browser,ga:city,ga:mobileDeviceInfo,ga:source",
			"end-date":"today",
			"ids":"ga:"+account.profiles[i].id,
			"metrics":"ga:sessions,ga:pageviews,ga:sessionDuration",
			"start-date":"2005-01-01"
	};

	analytics.data.ga.get(params, function(err,data){
		console.log(data);
	})
}
/**
* Receives the JSON data, stores it in the DB if the user already has one it overwrites it
* IN CASE AN ERROR HAPPENS we will go with AnalyticsPureOnlineView Commandres ----> TODO
*/
function CreateAccountInformation(res,data){ 
  var account = new AccountInformation(data); 
  AccountInformation.findOne({ username: data.username }).remove(function(err) {
    account.save(function(err) {
      if (err) {  
      	res.send(error);
      } 
      	//Como es una prueba vamos a decir que solo necesitamos el mayor valor de Smarketeer
      	//Luego deberia recibir esta informacion desde el query http:smarketeer/dashboard/Name
      	 
      	GetViews(res,data.items[1].webProperties[0] );
    });
  }); 
}  

/**
* Recieve a res where to send the data
* @Receives account.items.webProperties 
* Return all the views from every View
*/
function GetViews(res,data){
	var visitas	 =[]; 
	var account = data;
	if(analytics == null) StartAnalytics(); 
	
	for( var i = 0 ; i < data.profiles.length;	 i++ ){  
		var params = {
			"end-date":"today",
			"ids":"ga:"+account.profiles[i].id,
			"metrics":"ga:pageviews",
			"start-date":"2005-01-01"
		};
		analytics.data.ga.get(params, function(err,data){ 
			if(err){
				console.log(err);
			}
			visitas.push(parseInt(data.totalsForAllResults["ga:pageviews"] )) ;
			//End of game pal
			if(visitas.length == account.profiles.length) 
				res.send( Math.max.apply(Math, visitas).toString() );
			
		}) 

	} 
	
}
