var config		      = require("../../config/config"); 
var PiwikClient     = require('piwik-client');
var piwik           = new PiwikClient(config.piwik.url, config.piwik.token )
var url             = require('url'); 
var Sale            = require("../models/sales.server.model");
var GetWebsiteDate  = require("./visits.server.controller").GetWebsiteDate;
var async           = require("async");
exports.RenderSales = function ( req,res ){
	if (!req.user) { 
		res.redirect("/login");
	}
	res.render("home/funnel/sales",{
    idSite: req.query.idSite
  }); 
}


/**
* Get everything I can which is a lead
* An index goes here
*/
exports.GetSales = function(req,res){
  var page= req.body.page; 
  page =  ( page == 0 ) ? page  : page * 20;
  //Form the pages
  var data="";
  piwik.api({
    method:   'Smarketeer.getSales',
    idSite:    req.body.idSite,
    filter_offset: page,
    filter_limit:page+20,
  },function(err,results){
    if(err) res.send(err);
    else{ 
      console.log(results);
      html="";  
      var key, i = 0;
      for(key in results) { 
        html+=json2table(results[i],req.body.idSite);
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
  var date= date.split(","); 
  console.log(date);
  piwik.api({
    method:"Smarketeer.GetAllSources",
    idSite:idSite, 
    idGoal: '2', 
    from:date[0],
    to:date[1] 
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
  console.log(range);
piwik.api({
    method:"Goals.get",
    idSite:id, 
    period:"range",
    date:range, 
    idGoal:"2"
  },function(err,sales){ 
    if(err){
      console.log(err);
      res.send(0).status(200);
      return 0;
    }  
      console.log("HEYHO"+sales);
      res.send(sales).status(200);
  });
} 

/** 
*/

exports.Export = function(req,res,next){
  async.series({
      visitas: function(callback){ 
            piwik.api({
                method:   'Smarketeer.getSales',
                idSite:    req.body.idSite,
                filter_offset:0 , 
              },callback);  
          }
      },function(err, results) {
        if(err) {console.log(err);
          res.send(err);}
          else{ 
            html="<tr><td>Email</td><td>Campaña</td><td>Fuente</td><td>Medio</td><td>Contenido</td><td>URL del referido</td><td>Pagina de destino</td><td>Total vendido</td></tr>";  
            var key, i = 0;
            for(key in results.visitas) {
              html+=json2table(results.visitas[i],req.body.idSite);  
              i++;     
            }    
              res.send(html).status(200);;
          }
      });  
}
/**
* This function gets the information of both, put it together and rock it
*/
function json2table(visita,idSite){   
  
    //First we create the href and the id
  //Parseamos la url  
  var query =""// url.parse(visita.actionDetails[0].url,true).query; 
  var email = visita.custom_var_v1||visita.user_id|| "indefinido" ;

  var  totalVenta=0;
  /*for(var i = 0; i<=Object.keys(visita.actionDetails).length;i++ ){
    if(visita.actionDetails[i] && visita.actionDetails[i].goalId=="2")
      totalVenta+=visita.actionDetails[i].revenue;

  }*/
    var NewVisitor= '<tr><td>'+
          '<a href="/visitors/seemore/'+visita.user_id+'/?idSite='+idSite+'">';

      NewVisitor +=  email+'</a>'+'</td>'; 
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
        NewVisitor += (visita.name) ? "<td>"+visita.name+"</td>" :  "<td></td>";

        //Status
        NewVisitor+='<td>$'+Math.round(visita.total * 100) / 100 +'</td></tr>';  
        return NewVisitor;

} 