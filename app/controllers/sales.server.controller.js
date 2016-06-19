var config		  = require("../../config/config"); 
var PiwikClient   = require('piwik-client');
var piwik         = new PiwikClient(config.piwik.url, config.piwik.token )
var url           = require('url'); 
var Sale          = require("../models/sales.server.model");

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
          segment : 'visitConvertedGoalId==2',
          showColumns:"totalRevenueByGoal,userId,lastActionDateTime,visitorId,actionDetails,referrerName,referrerTypeName,referrerUrl,visitorType,customVariables",
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
              i++;     
            }  
            res.send(html).status(200); 
          }
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
          '<a href="/visitors/seemore/'+visita.userId+'">';

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
        NewVisitor+='<td class="try" id="'+visita.userId+'">'+
            '<a href="#">Registrar Venta</a></td>';  
        return NewVisitor;

} 