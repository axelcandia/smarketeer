var config			  = require("../../config/config");
var PiwikClient   = require('piwik-client');
var piwik         = new PiwikClient(config.piwik.url, config.piwik.token )
var url           = require('url');
var Visitors      = require("../models/visitors.server.model");

exports.RenderVisitors = function ( req,res ){ 
    res.render('home/funnel/visitors', { 
       IdSite: req.query.IdSite,
       maxpage  : (visits/20)+1 
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
      idSite:   req.body.IdSite,
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
          html+=json2table(visitas[i]);
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
  piwik.api({
    method:   'Live.getLastVisitsDetails',
    idSite: req.query.IdSite,
    period: '',
    date: '',
    segment: segment,
    countVisitorsToFetch: '',
    minTimestamp: '',
    flat: '',
    doNotFetchActions: ''

  },function(err,data){
    if(err){
      console.log(err)
    }
    else{
      console.log(JSON.stringify(data[0]));
      res.render('home/funnel/visitorprofile', { 
        actions: data[0].actionDetails
      }); 
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
function json2table(visita){  
  //First we create the href and the id
  //Parseamos la url 
  var query = url.parse(visita.actionDetails[0].url,true).query; 
  //Visitor date
   var NewVisitor='<tr>'+
              '<td>'+visita.lastActionDateTime+ '</td>';
      //Visitor ID
       NewVisitor+= '<td>'+
          '<a href="/visitors/seemore/'+visita.userId+'">'+
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
  GetWebsiteDate(res,req.body.idSite,GetPiwikVisitsCounter);
}
/**
* Returns all visits from that date and executes callback
* WebsiteId: id of the websit
* Period: range/month/year it will return these value of the date 
*/

/**
* Call the piwik counter and returns data
*/
function GetPiwikVisitsCounter(res,id,range){
piwik.api({
    method:"VisitsSummary.getVisits",
    idSite:id,
    period:"range",
    date:range,
    segment: 'visitConvertedGoalId!=2', 
  },function(err,visitas){ 
    if(err || !visitas.value){
      console.log(err);
      res.send(0).status(200);
      return 0;
    }  
      res.send(visitas.value.toString()).status(200);
  });
}


/**
* Returns the id of the website and a valid range to use in any function.
*/
function GetWebsiteDate(res,id,callback){
  piwik.api({
    method:"SitesManager.getSiteFromId",
    idSite:id
  },function(err,data){
    if(err){
      console.log(err);
      res.send(0).status(200);
      return 0;
    }  
    var n = data[0].ts_created.indexOf(' ');
    var range = data[0].ts_created.substring(0, n != -1 ? n : data[0].ts_created.length);
    range+=",today"; 
    callback(res,id,range);
  });
 
}