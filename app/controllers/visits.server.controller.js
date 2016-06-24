var config			  = require("../../config/config");
var PiwikClient   = require('piwik-client');
var piwik         = new PiwikClient(config.piwik.url, config.piwik.token )
var url           = require('url');
var Visitors      = require("../models/visitors.server.model");
var async         = require("async");

exports.RenderVisitors = function ( req,res ){ 
    res.render('home/funnel/visitors', { 
       idSite: req.query.idSite,
      });   
}

/**
* Brings visits data by date
*/
exports.GetMoreVisitors =function (req,res){   
  var page= req.body.page; 
//console.log(page);
  page =  ( page == 0 ) ? page  : page * 20;
  piwik.api({
      method:   'Live.getLastVisitsDetails',
      idSite:   req.body.idSite,
      period:   '',
      date:     '',
      segment : 'visitConvertedGoalId!=2',
      showColumns:"lastActionDateTime,userId,actionDetails,referrerName,referrerTypeName,referrerUrl,visitorType",
      countVisitorsToFetch : '',
      minTimestamp : '',
      flat : '',
      doNotFetchActions : '',
      filter_offset:page,
      filter_limit:20,
    },function( err, visitas ){ 
      if(err) res.send(err);
      else{  
        html="";  
        var key, i = 0; 
        for(key in visitas) {
          html+=json2table(visitas[i],req.body.idSite);
          //html+=GetStatus(visitas[i]);  
          i++;     
        }  
        res.send(html).status(200); 
      }
    }); 

 /* GetProfileInformation(function(err,data){
    console.log(data.lastVisits[0]);
  });*/
}
/**
* REQUIRES the id and returns EVERYTHING WE HAVE ABOUT HIM 
*/
exports.GetVisitData = function(req,res,next){
  var segment= "userId=="+req.params.id
  // an example using an object instead of an array
  async.parallel({
      StaticProfile: function(callback){
        GetStaticProfile(req.query.idSite,segment,callback)
      },
      Forms: function(callback){ 
        callback(null, 2); 
      },
      DynamicProfile: function(callback){
        callback(null, 20); 
      }

  },
  function(err, results) {
    res.render('home/funnel/visitorprofile', {  
        idSite:       req.query.idSite,
        UserId:       req.params.id,
        totalVisits:  results.StaticProfile.totalVisits,
        visits:       results.StaticProfile.lastVisits,
        email:        (results.StaticProfile.lastVisits[0].customVariables["1"]) ? results.StaticProfile.lastVisits[0].customVariables["1"].customVariableValue1 :req.params.id,
        ventas:       (results.StaticProfile.totalConversionsByGoal && results.StaticProfile.totalConversionsByGoal["idgoal=2"]) ? results.StaticProfile.totalConversionsByGoal["idgoal=2"] : "0",
        ingresos:     (results.StaticProfile.totalRevenueByGoal && results.StaticProfile.totalRevenueByGoal["idgoal=2"]) ? results.StaticProfile.totalConversionsByGoal["idgoal=2"] :"0",
        empty:        ""
      }); 
  });
};
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
  
MyModel.findOneAndUpdate(query, req.newData, {upsert:true}, function(err, doc){
    if (err) return res.send(500, { error: err });
    return res.send("succesfully saved");
});
}
/*
  
      console.log(JSON.stringify(data));

      
    } 
    
  });
  
}

/**
* Get the status of the visitor
*/
function GetStatus(visita){
  Visitors.findOne({ 'cookies': visita.visitorId }, function (err, visit) {
          if (err || !visit ) NewVisitor += '<td><span class="label label-sm label-success">Lead</span></td>';
          else{  
          } 
           NewVisitor+="</tr>"; 
           return NewVisitor;
        });  
}
/**
* Get all the data of the visit and convert it in table mode
*/
function json2table(visita,idSite){  
  //First we create the href and the id
  //Parseamos la url 
  var query = url.parse(visita.actionDetails[0].url,true).query; 
  //Visitor date
   var NewVisitor='<tr>'+
              '<td>'+visita.lastActionDateTime+ '</td>';
      //Visitor ID
       NewVisitor+= '<td>'+
          '<a href="/visitors/seemore/'+visita.userId+'/?idSite='+idSite+'">'+
              visita.userId +
          '</a>'+
        '</td>';

        //Campaign name, we only display it if it was a campagin!!!
        NewVisitor+= (visita.referrerTypeName =="Campaigns") ? 
                      '<td>'+visita.referrerName+'</td>':
                      "<td></td>";

        //Source
        NewVisitor += (visita.referrerName) ? '<td>'+visita.referrerName+'</td>' : '<td>'+visita.referrerTypeName+'</td>';
        
        //Medium
        NewVisitor += (query.utm_source) ? '<td>'+query.utm_source+'</td>' : '<td>'+visita.referrerTypeName+'</td>';

        //Refferer
        if(visita.referrerName && visita.referrerUrl!=null )
          NewVisitor +='<td>'+visita.referrerUrl+'</td>';
        else
          NewVisitor +='<td></td>'; 
        //Landing page  
        NewVisitor+='<td>'+visita.actionDetails[0].url.replace(query," ")+'</td>';
        //Status
        NewVisitor+='<td>'+visita.visitorType+'</td>'; 
        return NewVisitor;
}



exports.CountVisitors = function(req,res){ 
  GetWebsiteDate(req,res,GetPiwikVisitsCounter);
}
/**
* Returns all visits from that date and executes callback
* WebsiteId: id of the websit
* Period: range/month/year it will return these value of the date 
*/

/**
* Call the piwik counter and returns data
*/
function GetPiwikVisitsCounter(res,idSite,date,period){
  console.log("period:"+period);
  console.log("date:"+date);
piwik.api({
    method:"VisitsSummary.getVisits",
    idSite:idSite,
    period:period,
    date:date,
    segment: 'visitConvertedGoalId!=2', 
  },function(err,visitas){  
    if(err || !visitas.value){
      console.log(err);
      res.send(0).status(200);
      return 0;
    }  
      console.log("VISIT THIS"+JSON.stringify(visitas));
      res.send(visitas.value.toString()).status(200);
  });
}


/**
* Returns the id of the website and a valid range to use in any function.
*/
var GetWebsiteDate=function (req,res,callback){  
  if(req.body.date){
    callback(res,req.body.idSite,req.body.date,req.body.period)
  }
  else{
    piwik.api({
    method:"SitesManager.getSiteFromId",
    idSite:req.body.idSite,
    },function(err,data){
      if(err){
        console.log(err);
        res.send(0).status(200);
        return 0;
      }  
      var n    = data[0].ts_created.indexOf(' ');
      var date = data[0].ts_created.substring(0, n != -1 ? n : data[0].ts_created.length)+
                 ",today"; 
      callback(res,req.body.idSite,date,"range");
    });
  }

}
exports.GetWebsiteDate= GetWebsiteDate;