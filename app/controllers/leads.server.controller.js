var config		     = require("../../config/config");
var http           = require('http');
var PiwikClient    = require('piwik-client');
var piwik          = new PiwikClient(config.piwik.url, config.piwik.token )
var url            = require('url');
var Visitors       = require("../models/visitors.server.model");
var Sale           = require("../models/sales.server.model");
var GetWebsiteDate = require("./visits.server.controller").GetWebsiteDate;
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
	  	idSite:req.query.idSite
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
  console.log(req.body);
	page =  ( page == 0 ) ? page  : page * 20;
    piwik.api({
          method:   'Smarketeer.getLeads',
          idSite:    req.body.idSite,
          filter_offset:page,
          filter_limit:20,
        },function( err, visitas ){ 
          console.log(JSON.stringify(visitas));
          if(err) res.send(err);
          else{ 
            html="";  
            var key, i = 0;
            for(key in visitas) {
              html+=json2table(visitas[i],req.body.idSite);  
              i++;     
            }  
            res.send(html).status(200); 
          }
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

/**
* Guardo la compra que hizo un usuario
* documentation: http://developer.piwik.org/api-reference/tracking-api
*/
exports.GetSale = function (req,res){   
  var compra = new Sale({
    "data": req.body
  });
  compra.save();
  //Piwik magic 
  var segment= "userId=="+req.body.ClientId;

  piwik.api({
    method:"Live.getVisitorProfile",
    idSite: req.body.idSite,
    visitorId : '',
    segment : segment,
    limitVisits : '',
    showColumns:"lastVisits,customVariables"
  },function(err,visit){
    
    if(err || !visit){
      console.log(err);
      res.send(0).status(200);
      return 0;
    }   
    var email = (req.body.ClientEmail ) ? req.body.ClientEmail :"undefined"; 
    var path = "http://52.165.38.47/piwik.php?"+
      "uid="+req.body.ClientId+
      "&idsite="+req.body.idSite+
      "&rec="+1+
      "&apiv="+1+
      "&rand=1636495582"+
      "&idgoal="+2+
      '&_cvar={"1":["email","'+email+'"]}'+
      //"&url="+compra._id+//IMPORTANT: We use URL to save the ID of the Salee!!
      "&urlref="+visit.lastVisits[0].referrerUrl+
      "&revenue="+req.body.Total; 
      console.log("URL:"+path);

        http.get(path, (res) => {
        console.log(`Got response: ${res.statusCode}`);
        // consume response body
        res.resume();
      }).on('error', (e) => {
        console.log(`Got error: ${e.message}`);
      }); 
  });


  
}


exports.CountLeads = function(req,res){ 
  GetWebsiteDate(req,res,GetPiwikLeadsCounter);
}
/**
* Receives the cahnges in cost and changes the status of the visitor
*/
exports.SetCosts = function(req,res,next){ 
	res.send("").status(200);

}  
/**
* Get  the leads by channel (Website etc).
*/
exports.GetLeadsByChannel = function(req,res){
  GetWebsiteDate(req,res,GetReferrers);
}

function GetReferrers(res,idSite,date,period){
  piwik.api({
    method:"Referrers.getReferrerType",
    idSite:idSite,
    period:period,
    date:date,
    segment: 'visitConvertedGoalId==1', 
  },function(err,referrers){
    if(err){
      console.log(err); 
      return 0;
    } 
    res.send(referrers).status(200);    
  });

}

/**
* This function gets the information of both, put it together and rock it
*/
function json2table(visita,idSite){
	  //First we create the href and the id
  //Parseamos la url  
  var query = url.parse(visita.actionDetails[0].url,true).query; 
  var email = (visita.customVariables && visita.customVariables["1"]) ?
              visita.customVariables["1"].customVariableValue1 :
              "indefinido" ;


  //Visitor date
   var NewVisitor='<tr>'+
              '<td>'+visita.lastActionDateTime+ '</td>';
      //Visitor ID
      
       NewVisitor+= '<td>'+
          '<a href="/visitors/seemore/'+visita.userId+'/?idSite='+idSite+'">';

      NewVisitor +=  email+
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
        NewVisitor+='<td class="try" data-email="'+email+'" id="'+visita.userId+'">'+
            '<a href="javascript:;">Registrar Venta</a></td>';  
        return NewVisitor;

} 