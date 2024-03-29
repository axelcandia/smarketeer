var config		     = require("../../config/config");
var http           = require('http');
var PiwikClient    = require('piwik-client');
var piwik          = new PiwikClient(config.piwik.url, config.piwik.token )
var url            = require('url');
var Visitors       = require("../models/visitors.server.model");
var Sale           = require("../models/sales.server.model");
var GetWebsiteDate = require("./visits.server.controller").GetWebsiteDate;
var async           = require("async");
var ImportXML2Json  = require("./Campaign.server.controller").ImportXML2Json;
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
  var page= req.body.page; 
  page =  ( page == 0 ) ? page  : page * 20;
  //Form the pages
  var data="";
  piwik.api({
    method:   'Smarketeer.getLeads',
    idSite:    req.body.idSite,
    filter_offset:page,
    filter_limit:page+20,
  },function(err, results) {
        if(err) {
          console.log(err);
          res.send(err);
        }
          else{ 
            html="";  
            var key, i = 0;
            for(key in results) {
              html+=json2table(results[i],req.body.idSite,true);  
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
    data:  req.body
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

    var lastVisit  = visit.lastVisits.length-1;
    var lastAction = visit.lastVisits[lastVisit].actionDetails.length-1; 

    var email = (req.body.ClientEmail ) ? req.body.ClientEmail :"undefined"; 
    var path = "https://legend.smarketeer.io/piwik.php?"+
      "uid="+req.body.ClientId+
      "&idsite="+req.body.idSite+
      "&rec="+1+
      "&apiv="+1+
      "&rand=1636495582"+
      "&idgoal="+2+
      "&_id"+visit.lastVisits[lastVisit].visitorId+
      '&_cvar={"1":["email","'+email+'"]}'+
      "&url="+visit.lastVisits[lastVisit].actionDetails[lastAction].url+
      "&urlref="+visit.lastVisits[lastVisit].referrerUrl+ 
      "&action_name=sale!"+
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
  var date= date.split(","); 
  piwik.api({
    method:"Smarketeer.GetAllSources",
    idSite:idSite, 
    idGoal: '1', 
    from:date[0],
    to:date[1]
  },function(err,referrers){
    if(err){
      console.log(err); 
      return 0;
    } 
    console.log("ref"+JSON.stringify(referrers));
    res.send(referrers).status(200);    
  });

}


exports.Export = function(req,res,next){
  async.series({
      visitas: function(callback){ 
            piwik.api({
                method:   'Smarketeer.getLeads',
                idSite:    req.body.idSite,
                filter_offset:0 , 
              },callback);  
          }
      },function(err, results) {
        if(err) {console.log(err);
          res.send(err);}
          else{ 
           html="<tr><td>Fecha</td><td>Email</td><td>Campaña</td><td>Fuente</td><td>Medio</td><td>Contenido</td><td>URL del referido</td><td>Pagina de destino</td></tr>";  
            var key, i = 0;
            for(key in results.visitas) {
              html+=json2table(results.visitas[i],req.body.idSite,false);  
              i++;     
            }    
              res.send(html).status(200);;
          }
      });  
}



/**
* This function gets the information of both, put it together and rock it
*/
function json2table(visita,idSite,registrarVenta){
	var query =""// url.parse(visita.actionDetails[0].url,true).query; 
  var email = visita.custom_var_v1 || "indefinido" ;
  var  totalVenta=0;
  var NewVisitor='<tr><td>'+
        visita.visit_last_action_time.substring(0,visita.visit_last_action_time.indexOf(" "))+
        "</td>";


    var medio = (visita.referer_url!="null"&& visita.referer_url) ? "referido" : "Entrada directa";
        medio = (visita.campaign_medium)     ?  visita.campaign_medium : medio;

   var ref = (visita.referer_url!="null" &&  visita.referer_name ) ? visita.referer_name: "Entrad directa";
       ref = (visita.campaign_source)     ?  visita.referer_name : ref;

   medio= (ref=="Google"||ref=="Bing") ? "Organico" : medio;

  //Visitor date
   NewVisitor+='<td>'+
          '<a href="/visitors/seemore/'+visita.user_id+'/?idSite='+idSite+'">';

      NewVisitor +=  email+'</a>'+'</td>';
          
        console.log(visita);
        //Campaign name, we only display it if it was a campagin!!!
        NewVisitor+= ( visita.referer_type == 6 ) ? 
                      '<td>'+visita.referer_name+'</td>':
                      "<td></td>";

        //Source 
        NewVisitor +=  '<td>'+ref+'</td>';
        
        //Medium
        NewVisitor += '<td>'+medio+'</td>';
        
        //Content
        NewVisitor += (visita.campaign_content) ? '<td>'+visita.campaign_content+'</td>' : '<td></td>';
        //Refferer
        NewVisitor += (visita.referer_name) ? "<td>"+visita.referer_url+"</td>" :  "<td>"+visita.referer_url+"</td>";
        //Landing page  
        NewVisitor += (visita.url) ? "<td>"+visita.url+"</td>" :  "<td></td>";


        //Status
        if(registrarVenta)
          NewVisitor+='<td class="try" data-email="'+email+'" id="'+visita.user_id+'">'+
              '<a href="javascript:;">Registrar Venta</a></td>';  
        return NewVisitor+"</tr>";

} 

exports.importLeads = function(req,res){ 
  
  async.series({
      json: function(callback){
        ImportXML2Json(req,res,callback)
      }
  },function(err, results) {
    if(err){
      res.send('{"err":"200"}').status(200);
      return;
    }  
    console.log(data);
    res.send({});
 });

}