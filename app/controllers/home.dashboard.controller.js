var config			= require("../../config/config");
var user 			= require('../models/user.server.model');
var PiwikClient 	= require('piwik-client');
var Website 		= require('../models/websites.server.model');
var Visitors 		= require('../models/visitors.server.model');
var piwik 			= new PiwikClient(config.piwik.url, config.piwik.token ); 

exports.GetHome = function(req, res, next) {  
	GetWebsiteFirstDate(req.query.idSite, function(date){  
			res.render('home', {
				websites: req.user.websites,
				idSite: req.query.idSite,
				StartDate: date
			});
		});
};
 
/**
* Get Current User Data
* If error you must login
* If not return data to callbsack
*/
function GetWebsiteFirstDate( idSite,callback ){
	piwik.api({
    method:"SitesManager.getSiteFromId",
    idSite:idSite,
    show: "ts_created"
  },function(err,date){
    if(err){
      console.log(err); 
      return 0;
    } 
    var date = 	date[0].ts_created.substring(8,10)+"/"+
     			date[0].ts_created.substring(5,7)+"/" + 
     			date[0].ts_created.substring(0,4);

    callback(date);
  });
}

