var config			= require("../../config/config");
var user 			= require("../models/user.server.model");
var PiwikClient 	= require('piwik-client');
var piwik 			= new PiwikClient(config.piwik.url, config.piwik.token )

exports.getHome = function(req, res, next) {
	if (!req.user) { 
		res.redirect("/login");
	}
	else {
		GetUserData(req,res,function(user){
			res.render('home', {
				websites: user.websites
			});
		});
	}
};


/**
* Get Current User Data
* If error you must login
* If not return data to callbsack
*/
function GetUserData( req,res,callback ){
	user.findById(req.user.id, function(err,data){
		if(err) res.redirect("/login");
		callback( data ) ;
	});
}

/**
* Finds the starting date of the website and executes GetVisitorsById

function GetAllVisitors ( websiteId,startDate ){

	Websites.findOne({ "piwikId": websiteId }, function(err,resp){
		if(err){
			res.send("err");
		}
		else
		{
			var date = resp.creation+",today";

			GetVisitorsByDate(websiteId,"range", date,function(err,data){
				res.send(data);
			});
		}
	});
	
}*/
/**
* Returns all visits from that date and executes callback
* WebsiteId: id of the websit
* Period: range/month/year it will return these value of the date 
*/

function GetVisitorsByDate( websiteId, period, date, callback ){
	piwik.api({
		  method: 	'VisitsSummary.getVisits',
		  segment: 	'',
		  columns: 	'',
		  idSite: 	websiteId,
		  period: 	period,
		  date:     date
		},function( err, visits ){
			if(err) return (err);
			callback(null,visits.value);
		});
}

/**
* Goes to the DB to check leads
*/
function GetLeads( websiteId ){

}

function GetVisitorsByReferrer( websiteId ){

}
/**
* Gets the sales from the website by its Id
*/
function GetSales( websiteId ){

}