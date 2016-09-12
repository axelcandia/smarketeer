var config			     = require("../../config/config");
var user 			       = require('../models/user.server.model');
var PiwikClient      = require('piwik-client');
var Website 		     = require('../models/websites.server.model');
var Visitors 		     = require('../models/visitors.server.model');
var GetWebsiteDate   = require("./visits.server.controller").GetWebsiteDate;
var piwik 			     = new PiwikClient(config.piwik.url, config.piwik.token ); 
var async            = require("async");
var Campaigns        = require('../models/campaign.server.model');
exports.GetHome = function(req, res, next) {  
  async.series({ 
      FirstDate : function(callback){
        GetWebsiteFirstDate(req.query.idSite,callback)
      }
    },
      function(err,data){ 
        res.render('home', {
          websites: req.user.websites,
          idSite: req.query.idSite,
          StartDate: data.FirstDate
        });
      });
}  

exports.getTotalCost = function(req,res){ 

  GetWebsiteDate(req,res,getCost);
} 



function getCost(res,idSite,date,period){ 
  var dateParts = date.split(",");  
  var from      = dateParts[0].split("-");
  var to        = dateParts[1].split("-");
  console.log(idSite);
   var agg = [{
                $match:{
                    idSite:idSite,
                    from: {$gte : new Date(from[0], from[1], from[2])} 
                  }
                }, 
                {$group: {
                  _id: null,
                  "total": {
                        "$sum": "$total"
                    }
                }}

              ];

              Campaigns.aggregate(agg, function(err, costs){
                if (err) {
                  console.log(err);
                 res.send(0).status(200) 
               }
               else{
                cost = (costs[0]) ? costs[0].total :  0 ; 
                console.log("THIS IS DA COST:"+JSON.stringify(costs));
                console.log(cost.toString());
                res.send(cost.toString()).status(200);
               }
                
         });

}
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
      callback(err,null); 
      return 0;
    } 
    var date = 	date[0].ts_created.substring(8,10)+"/"+
     			date[0].ts_created.substring(5,7)+"/" + 
     			date[0].ts_created.substring(0,4);

    callback(null,date);
  });
}

