var async         = require("async");
var config        = require("../../config/config");
var PiwikClient   = require('piwik-client');
var piwik         = new PiwikClient(config.piwik.url, config.piwik.token )
var http           = require('http');
var SolvedForms   = require("../models/solvedforms.server.model.js"); 
var Visitors      = require("../models/visitors.server.model");
/**
* REQUIRES the id and returns EVERYTHING WE HAVE ABOUT HIM 
*/
exports.GetVisitData = function(req,res,next){  
    GetProfileByEmail(req,res,next); 
}




/**
*If the user has an email it will execute this and retrieve EVERYTHING
* That has the same key( EVEN MOBILE!! :D)
*/
function GetProfileByEmail(req,res,next){
   var segment= "userId=="+req.params.id;
   // an example using an object instead of an array
  async.series({
      StaticProfile: function(callback){
        GetStaticProfile(req.query.idSite,segment,callback)
      },
      Forms: function(callback){ 
        GetCompletedForms(req.params.id, callback); 
      },
      DynamicProfile: function(callback){
        GetDynamicProfile(req.params.id,callback); 
      }/*,
      GoogleData: function(callback){
        GetGoogleData(req.params.id,callback)
      }*/

  },
  function(err, results) { 
      res.render('home/funnel/visitorprofile', {  
        idSite:       req.query.idSite,
        UserId:       req.params.id,
        totalVisits:  results.StaticProfile.totalVisits,
        visits:       results.StaticProfile.lastVisits,
        email:        (results.StaticProfile.lastVisits[0].customVariables["1"]) ? results.StaticProfile.lastVisits[0].customVariables["1"].customVariableValue1 :"",
        ventas:       (results.StaticProfile.totalConversionsByGoal && results.StaticProfile.totalConversionsByGoal["idgoal=2"]) ? results.StaticProfile.totalConversionsByGoal["idgoal=2"] : "0",
        ingresos:     (results.StaticProfile.totalRevenueByGoal && results.StaticProfile.totalRevenueByGoal["idgoal=2"]) ? results.StaticProfile.totalConversionsByGoal["idgoal=2"] :"0",
        empty:        "",
        about:        (results.DynamicProfile) ? results.DynamicProfile.about : "",
        TotalForms:   Object.keys(results.Forms).length,
        comments:     (results.DynamicProfile) ? results.DynamicProfile.comments : "", 
        img:          results.GoogleData
      }); 
    
  }); 
}

 


/**
* Static profile is all the data that we save using the tracking code
*/
function GetStaticProfile(idSite,segment,callback){
  piwik.api({
    method:   'Live.getVisitorProfile',
    idSite: idSite,
    visitorId: '',
    segment:'',
    limitVisits: '',
    segment: segment,
  },function(err,data){
    if(err){
      console.log(err);
      callback(err,null)
    }
    else{
      callback(null,data);
    }

  });
}


/**
* Dynamic is all the data that a user can change any time he wants
*/
function GetDynamicProfile(userId,callback){

  Visitors.findOne({"CookieId":userId}, function(err, profile){
      if (err) return callback(err,null);
      return callback(null,profile);
  });
} 

/**
*Receives the emails and gets all the available data from there
*/
function GetGoogleData(email,callback){
  var path="http://picasaweb.google.com/data/entry/api/user/"+email+"?alt=json";
  console.log(path);
  http.get(path, function(res) { 
      res.on("data", function(chunk) {
        var image_data=JSON.parse(chunk);
        console.log("BODY: " + image_data.entry["gphoto$thumbnail"]["$t"]);
        callback(null,image_data.entry["gphoto$thumbnail"]["$t"]);
        
      });
    }).on('error', function(e) {
      callback(null,"");
    });


}

function GetCompletedForms(userId,callback){ 
  console.log(userId);
  SolvedForms.find({"userId" : userId}, function(err, profile){
      if (err) {
        console.log(err);
      }
       // return callback(err,null);
      console.log(profile);
      return callback(null,profile);
  });
}