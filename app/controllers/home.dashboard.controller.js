var config			= require("../../config/config");
var user 			= require('../models/user.server.model');
var PiwikClient 	= require('piwik-client');
var Website 		= require('../models/websites.server.model');
var Visitors 		= require('../models/visitors.server.model');
var piwik 			= new PiwikClient(config.piwik.url, config.piwik.token );
var Q 				= require('q');

exports.getHome = function(req, res, next) { 
		GetUserData(req,res,function(user){ 
			res.render('home', {
				websites: user.websites,
				IdSite: req.query.IdSite
			});
		}); 
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

