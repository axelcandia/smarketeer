var config			= require("../../config/config");
var user 			= require('../models/user.server.model');
var PiwikClient 	= require('piwik-client');
var Website 		= require('../models/websites.server.model');
var Visitors 		= require('../models/visitors.server.model');
var piwik 			= new PiwikClient(config.piwik.url, config.piwik.token );
var Q 				= require('q');

exports.getHome = function(req, res, next) {
	if (!req.user) { 
		res.redirect("/login");
	}
	else {
		GetUserData(req,res,function(user){
			console.log("This is our id"+req.params.id);
			res.render('home', {
				websites: user.websites,
				CurrentSite: req.params.WebsiteId
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
*/
exports.GetAllVisitors = function (req,res,next){    
		Website.findOne({ "piwik_id": req.body.id }, function(err,resp){
		if(err){
			res.send("err");
		}
		else
		{ 
			if(!resp){
				res.send("0").status(200);
				return;
			}
			//Making my day
			var month = resp.created.getUTCMonth() + 1; //months from 1-12
			var day = resp.created.getUTCDate();
			var year = resp.created.getUTCFullYear(); 
			newdate = year + "-" + month + "-" + day;

			//Making me a date FROM to somethin
			var date = newdate+",today";  

			GetVisitorsByDate(resp.piwik_id,"range", date, function(err,data){
				
				res.status(200).send(data.toString());  
			});
		}
	});
	
} 
/**
* Returns all visits from that date and executes callback
* WebsiteId: id of the websit
* Period: range/month/year it will return these value of the date 
*/

function GetVisitorsByDate( websiteId, period, date, callback ){ 
	piwik.api({
		  method: 	'VisitsSummary.getVisits',
		  segment: 	'visitConvertedGoalId!=2', 
		  idSite: 	websiteId,
		  period: 	period,
		  date:     date
		},function( err, visits ){ 
			if(err) return (err); 
			callback(null,visits.value);
		});
}

