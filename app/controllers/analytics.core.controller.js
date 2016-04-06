var config			= require("../../config/config");
var google 	  		= require("googleapis");
var OAuth2 			= google.auth.OAuth2;
var oauth2Client 	= new OAuth2(config.google.clientID, config.google.clientSecret, config.google.callbackURL);

/**
*
*/
exports.GetVisits = function (req, res){
	analytics=StartAnalytics(req,res);

}
/**
* Returns the view with biggest visits and the number of total visits
*/
exports.GetDashboardVisits = function (req,res){ 
	analytics=StartAnalytics(req,res);
	analytics.management.accountSummaries.list(function(err,data){
			if(err)
				//Return error view
				console.log(err)
			else{
				 var accounts 	= GetAccountsId(data);
				 var bigId		= accounts[i];
				 var visits 	= 0;
				 for(var i= 0; i<=accounts.length; i++){
				 	var nVisits =GetRealTimeData(analytics,accounts[i]).visits;
				 	if( visits < nVisits ){
				 		nVisits	= nVisits;
				 		bigId 	= accounts[i];
				 	}
				 }
				 console.log("Visits" + visits);
			}
	
	}
}

function GetRealTimeData(analytics, profileId){
	var params = {
		"ids":"ga:"+profileId,
		"metrics":"rt:pageviews",
	}; 

	analytics.data.realtime.get(params, function(err,data){
		if(err)
			console.log(err);
		else
			console.log(JSON.stringify(data));
	})
}

/**
* Devuelve un array the cuentasId
*/
function GetAccountsId(data){
	var accountsList=[];
	for(var nItem=0;	nItem<data.totalResults;	nItem++)
			for(var nProfile = 0; nProfile < data.items[i].webProperties.profiles.length; nProfile++ ){
				list.push(data.items[nItem].webProperties.profile[nProfile]);
			}
    return accountsList;
}


function StartAnalytics(req,res){
	oauth2Client.setCredentials({
	  access_token: req.user.tokens[0].accessToken,
	  refresh_token: req.user.tokens[0].refreshToken,
	  expiry_date: true
	}); 
	return google.analytics({ version: 'v3', auth: oauth2Client }); 
}