var config		     = require("../../config/config");
var PiwikClient   	 = require('piwik-client');
var piwik         	 = new PiwikClient(config.piwik.url, config.piwik.token );
var async            = require("async");
var Campaigns        = require("../models/campaign.server.model"); 


exports.RenderReport=function(req,res,next){
	res.render("home/reporting",{
			idSite:req.query.idSite
		}); 
}

 exports.GetReports=function(req,res,next){
    console.log("HEEEY"+req.body.lineal );
 	var mediumMethod	=(req.body.lineal=="true") ? "getRevenueByLinealVisit" : "getRevenueByFirstVisit";

 	var clientsMethod	=(req.body.lineal=="true") ? "getCustomersByLinealVisit" : "getCustomersByFirstVisit";			 
 	var source=req.body.source.replace("campaign_","");
    source=(source=="name") ? "$campaign": "$"+source;
    console.log(source);
    async.series({
 		GetClientes: function(callback){
 			piwik.api({
                method:    "SmarketeerReport." + clientsMethod,
                idSite:    req.body.idSite,
                source:    req.body.source, 
              },callback);  
          },

        GetMedium: function(callback){
        	piwik.api({
                method:    "SmarketeerReport." + mediumMethod,
                idSite:    req.body.idSite,
                source:    req.body.source, 
              },callback); 

        }, 
        GetCosts: function(callback){
             var agg = [{
                $match:{
                    idSite:req.body.idSite
                }
             },
               
                {$group: {
                  _id: source,
                  "total": {
                        "$sum": "$total"
                    }
                }},

              ];

              Campaigns.aggregate(agg, function(err, costs){
                if (err) { callback(err,null); }
                console.log(costs);
                callback(null,costs);
         });

        }
 	},function(err,data){ 
 		if(err)
 			res.send(err).status(200); 
 		else{   
	     	var html="";  
	     	var key;  
	      	for(key in data.GetClientes) {  
                html+=json2table(data.GetClientes[key],data.GetMedium[key],data.GetCosts); 
            } 

	      res.send(html).status(200); 
    	}
 	});
} 

function json2table(client,medium,cost){  
    console.log(client.nsource);
    var source=client.nsource || client.secondSource;
     var tCost  = 0; 

    for(var key in cost) {
        console.log(cost[key]._id );  
        if( (cost[key]._id && source ) && ( cost[key]._id == client.nsource ||cost[key]._id.toLowerCase() == client.nsource || cost[key]._id==source.slice(0, -1) ) ){
            tCost=cost[key].total;
            console.log([key]._id );
        } 
    } 
    var margen      = medium.revenue-tCost; 
    var ROI         = (tCost!=0) ? (margen/tCost)*100 : 0;
    var CAC         = (client.Clientes!=0) ? tCost/client.Clientes : 0; 
    var LTV         = (client.Clientes!=0) ?  medium.revenue/client.Clientes : 0;
    var LTVdivCAC   = (CAC!=0) ? LTV/CAC : 0;
	var NewReport   ='<tr>';
	//We add the Source ||client.secondSource
    NewReport += ( source ) ? "<td>"+source+"</td>" : "<td>N/A</td>";

    //We add gastos
    //We search for the cost AND WE ADD IT MADAFAKER :DDD
    
    NewReport += "<td>"+convertToCash(tCost)+"</td>";
    //We add ingresos
    NewReport +=(medium.revenue) ? "<td>"+convertToCash(medium.revenue)+"</td>" : '<td>$0</td>';

    
    //We add ROI
    

    NewReport +='<td>'+  ROI.toFixed(2) +'%</td>';

    //We add margen
    NewReport +='<td>'+convertToCash(margen)+'</td>';

    //We add Clients
    NewReport += (client.Clientes) ? "<td>"+client.Clientes+"</td>": '<td>0</td>';

    //We add CAC
    
    NewReport +='<td>'+convertToCash(CAC||0)+'</td>';

    //We add LTV
    NewReport +='<td>'+convertToCash(LTV||0)+'</td>';

    //We add LTV:cac
    NewReport +='<td>'+(LTVdivCAC||0).toFixed(2)+'</td>';

    //We add LTV-CAC
    NewReport +='<td>'+((medium.revenue/client.Clientes)-(tCost/client.Clientes)).toFixed(2)+'</td>';

	NewReport +='</tr>';    
	return NewReport;
}
function convertToCash(number){
            var n=Math.round(number).toFixed(2)
            n=n.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
            return "$"+n;
          } 
