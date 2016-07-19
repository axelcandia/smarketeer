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
  page =  ( page == 0 ) ? page  : page * 20;
  console.log(page);
  //Form the pages
  var data=""; 
  piwik.api({
                method:   'Smarketeer.getVisits',
                idSite:    req.body.idSite,
                filter_offset:page,
                filter_limit:page+20, 
              },function(err,data){
                console.log(JSON.stringify(data));
                html="";  
            var key, i = 0;
            for(key in data) {
              html+=json2table(data[i],req.body.idSite);  
              i++;     
            }   
            res.send(html).status(200); 
              });  
}
/**
* Get all the data of the visit and convert it in table mode
*/




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
    method:"VisitsSummary.getUsers",
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
      //Getting current Date;
      var offset=parseInt(data[0].timezone.replace( /UTC/, "" )); 
      var currentDate=new Date( new Date().getTime() + offset * 3600 * 1000).toISOString(); 
      currentDate=currentDate.substring(0,currentDate.indexOf('T'));

      //Make creation website date
      var n    = data[0].ts_created.indexOf(' ');
      var creationDate=data[0].ts_created.substring(0, n != -1 ? n : data[0].ts_created.length);
      //RETURNNG
      callback(res,req.body.idSite,creationDate+","+currentDate,"range"); 
      
    });
  }

}


exports.Export = function(req,res,next){
  async.series({
      visitas: function(callback){ 
            piwik.api({
                method:   'Smarketeer.getVisits',
                idSite:    req.body.idSite,
                filter_offset:0 , 
              },callback);  
          }
      },function(err, results) {
        if(err) {console.log(err);
          res.send(err);}
          else{ 
            html="<tr><td>Fecha</td><td>Id anonimo</td><td>Campaña</td><td>Fuente</td><td>Medio</td><td>Contenido</td><td>URL del referido</td><td>Pagina de destino</td><td>Estado</td></tr>";  
            var key, i = 0;
            for(key in results.visitas) {
              html+=json2table(results.visitas[i],req.body.idSite);  
              i++;     
            }   

            console.log(html);
              res.send(html).status(200);;
          }
      });  
}

function json2table(visita,idSite){// url.parse(visita.actionDetails[0].url,true).query; 
  var  totalVenta=0; 
 
  var NewVisitor='<tr><td>'+
        visita.visit_last_action_time+
        "</td>";
  //Visitor date
   NewVisitor+='<td>'+
          '<a href="/visitors/seemore/'+visita.user_id+'/?idSite='+idSite+'">';

      NewVisitor +=  visita.user_id+'</a>'+'</td>'; 
        //Campaign name, we only display it if it was a campagin!!!
        NewVisitor+= ( visita.referer_type == 6 ) ? 
                      '<td>'+visita.referer_name+'</td>':
                      "<td></td>";

        //Source
        NewVisitor += (visita.campaign_source) ? '<td>'+visita.campaign_source+'</td>' : '<td>Entrada Directa</td>';
        
        //Medium
        NewVisitor += (visita.campaign_medium) ? '<td>'+visita.campaign_medium+'</td>' : '<td>Entrada Directa</td>';

        //Content
        NewVisitor += (visita.campaign_content) ? '<td>'+visita.campaign_content+'</td>' : '<td></td>';
        //Refferer
        NewVisitor += (visita.referer_name) ? "<td>"+visita.referer_url+"</td>" :  "<td>"+visita.referer_url+"</td>";
        //Landing page  
        NewVisitor += (visita.url) ? "<td>"+visita.url+"</td>" :  "<td></td>";

        NewVisitor += (visita.status==0) ? "<td>Nuevo</td>" :  "<td>Recurrente</td>";

        NewVisitor +="</tr>"; 
        return NewVisitor;

} 
exports.GetWebsiteDate= GetWebsiteDate;