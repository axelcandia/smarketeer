var config		      = require("../../config/config"); 
var PiwikClient     = require('piwik-client');
var piwik           = new PiwikClient(config.piwik.url, config.piwik.token )
var url             = require('url'); 
var Sale            = require("../models/sales.server.model");
var GetWebsiteDate  = require("./visits.server.controller").GetWebsiteDate;

exports.RenderSales = function ( req,res ){
	if (!req.user) { 
		res.redirect("/login");
	}

	res.render("home/funnel/sales"); 
}


/**
* Get everything I can which is a lead
* An index goes here
*/
exports.GetSales = function(req,res){
	//Form the pages
  var page    = parseInt(req.body.page);
  var website = "1"; 

	page =  ( page == 0 ) ? page  : page * 20;
    piwik.api({
          method:   'Live.getLastVisitsDetails',
          idSite: website,
          period:   '',
          date:     '',
          segment : 'visitConvertedGoalId==2;userId!=null',
          showColumns:"goalName,revenue,totalRevenueByGoal,actionDetails,userId,lastActionDateTime,visitorId,actionDetails,referrerName,referrerTypeName,referrerUrl,visitorType,customVariables",
          countVisitorsToFetch : '',
          minTimestamp : '',
          flat : '',
          doNotFetchActions : '',
          filter_offset:page,
          filter_limit:20, 
        },function( err, sales ){ 
          
          if(err){
            console.log(err);
            res.send(err);
          } 
          else{ 
            html="";   
            var key, i = 0;
            for(key in sales) {
              html+=json2table(sales[i]);  
              i++;     
            }  
            res.send(html).status(200); 
          }
        }); 
} 
exports.CountSales = function(req,res){ 
  GetWebsiteDate(req,res,GetPiwikSalesCounter);
}

/**
* Get Refferrers
*/
exports.GetSalesByChannel = function(req,res){
  GetWebsiteDate(req,res,GetReferrers);
}
function GetReferrers(res,idSite,date,period){
  piwik.api({
    method:"Referrers.getReferrerType",
    idSite:idSite,
    period:period,
    date:date,
    segment: 'visitConvertedGoalId==2',  
  },function(err,referrers){
    if(err){
      console.log(err); 
      return 0;
    }
    res.send(referrers).status(200);   
  });

}

/**
* Call the piwik counter and returns data
*/
function GetPiwikSalesCounter(res,id,range){
piwik.api({
    method:"VisitsSummary.get",
    idSite:id,
    period:"range",
    date:range,
    segment: 'visitConvertedGoalId==2', 
    columns:"nb_visits"
  },function(err,sales){
    if(err || !sales.value){
      console.log(err);
      res.send(0).status(200);
      return 0;
    }  
      res.send(sales.value.toString()).status(200);
  });
} 



/**
* This function gets the information of both, put it together and rock it
*/
function json2table(visita){
    //First we create the href and the id
  //Parseamos la url  
  var query = url.parse(visita.actionDetails[0].url,true).query; 
  var email = (visita.customVariables && visita.customVariables["1"]) ?
              visita.customVariables["1"].customVariableValue1 :
              "indefinido" ;
  var  totalVenta=0;
  for(var i = 0; i<=Object.keys(visita.actionDetails).length;i++ ){
    if(visita.actionDetails[i] && visita.actionDetails[i].goalId=="2")
      totalVenta+=visita.actionDetails[i].revenue;

  }
    var NewVisitor= '<tr><td>'+
          '<a href="/visitors/seemore/'+visita.userId+'">'; 

      NewVisitor +=  email+'</a>'+'</td>';
          

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
        NewVisitor+='<td>'+totalVenta+'</td></tr>';  
        return NewVisitor;

} 