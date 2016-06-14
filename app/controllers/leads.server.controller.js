var config		  = require("../../config/config");
var PiwikClient   = require('piwik-client');
var piwik         = new PiwikClient(config.piwik.url, config.piwik.token )
var url           = require('url');
var Visitors      = require("../models/visitors.server.model");

/**
* Render lead view
*/
exports.RenderLeads = function ( req,res ){ 
	Visitors.where( {email: { $exists: true }} ).count(function (err, count) {
	  if (err) return handleError(err); 
	  if(count<20)
	  	var maximo=1;
	  else
	  {
	  	maximo= count/20 + count%20;
	  } 
	  res.render("home/funnel/leads",{
	  	MaxPages:maximo
	  }); 
	})
    

}

/**
* Get everything I can which is a lead
* An index goes here
*/

exports.GetLeads = function(req,res){
	//Form the pages
	var page    = parseInt(req.body.page);
  var website = "1"; 

	page =  ( page == 0 ) ? page  : page * 20;
    piwik.api({
          method:   'Live.getLastVisitsDetails',
          idSite: website,
          period:   '',
          date:     '',
          segment : 'visitConvertedGoalId==1',
          showColumns:"lastActionDateTime,visitorId,actionDetails,referrerName,referrerTypeName,referrerUrl,visitorType,customVariables",
          countVisitorsToFetch : '',
          minTimestamp : '',
          flat : '',
          doNotFetchActions : '',
          filter_offset:page,
          filter_limit:20,
        },function( err, visitas ){ 
          if(err) res.send(err);
          else{ 
            //console.log(JSON.stringify(visitas));
            html="";  
            var key, i = 0;
            for(key in visitas) {
              html+=json2table(visitas[i]);  
              i++;     
            }  
            res.send(html).status(200); 
          }
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
/**
* Call the piwik counter and returns data
*/
function GetPiwikLeadsCounter(res,id,range){
piwik.api({
    method:"VisitsSummary.get",
    idSite:id,
    period:"range",
    date:range,
    segment: 'visitConvertedGoalId==1', 
    columns:"nb_visits"
  },function(err,visitas){
    if(err || !visitas.value){
      console.log(err);
      res.send(0).status(200);
      return 0;
    }  
      res.send(visitas.value.toString()).status(200);
  });
}

exports.CountLeads = function(req,res){ 
  GetWebsiteDate(res,req.body.id,GetPiwikLeadsCounter);
}
/**
* Receives the cahnges in cost and changes the status of the visitor
*/
exports.SetCosts = function(req,res,next){ 
	res.send("").status(200);

} 
/**
* Send the graph for leads to the home
*/
exports.GetGraphLeads = function(req,res,next){
  GetWebsiteDate(res,req.body.id,GetReferrers);
}

function GetReferrers(res,id,range){
  piwik.api({
    method:"Referrers.getAll",
    idSite:id,
    period:"range",
    date:range,
    segment: 'visitConvertedGoalId==1',  
  },function(err,leads){
    if(err){
      console.log(err); 
      return 0;
    }  
      console.log(leads);
  });

}
/**
* This function gets the information of both, put it together and rock it
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
          '<a href="/visitors/seemore/5ee3c4a94ecde2f9">';//+visita.userId+'">';

      if( visita.customVariables && visita.customVariables["1"] ){ 
      NewVisitor += visita.customVariables["1"].customVariableValue1 +
                '</a>'+
        '</td>';
    }
    else{
      NewVisitor += "indefinido"+
            '</a>'+
        '</td>' ;
    }
          

        //Campaign name, we only display it if it was a campagin!!!
        NewVisitor+= (visita.referrerTypeName =="Campaigns") ? 
                      '<td>'+visita.referrerName+'</td>':
                      "<td></td>";

        //Source
        NewVisitor += (visita.referrerName) ? '<td>'+visita.referrerName+'</td>' : '<td>'+visita.referrerTypeName+'</td>';
        
        //Medium
        NewVisitor += (query.utm_source) ? '<td>'+query.utm_source+'</td>' : '<td>'+visita.referrerTypeName+'</td>';

        //Content
        NewVisitor += (query.utm_content) ? '<td>'+query.utm_content+'</td>' : '<td></td>';
        //Refferer
        if(visita.referrerName && visita.referrerUrl!=null )
          NewVisitor +='<td>'+visita.referrerUrl+'</td>';
        else
          NewVisitor +='<td></td>'; 
        //Landing page  
        NewVisitor+='<td>'+visita.actionDetails[0].url.replace(query," ")+'</td>';
        //Status
        NewVisitor+='<td class="try"><a href="#">Registrar Venta</a></td>'; 
        return NewVisitor;

} 