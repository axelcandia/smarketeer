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
 	var mediumMethod	=(req.body.lineal=="true") ? "getRevenueByLinealVisit" : "getRevenueByFirstVisit";

 	var clientsMethod	=(req.body.lineal=="true") ? "getCustomersByLinealVisit" : "getCustomersByFirstVisit";			 
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
 	},function(err,data){ 
 		if(err)
 			res.send(err).status(200); 
 		else{  
	     	var html="";  
	     	var key; 
	      	for(key in data.GetClientes) {  
                if(data.GetClientes[key].nsource){
                    Campaigns.aggregate(
                        { $match: {
                            source: data.GetClientes[key].nsource
                        }},
                        { $project: {
                            source: data.GetClientes[key].nsource||"",
                            total: { $add: "total" }
                        }}
                        ,function (err, results) {
                            if (err) {
                                console.error(err);
                            } else {
                                console.log(results);
                                html+=json2table(data.GetClientes[key],data.GetMedium[key],results.total); 
                            }
                        }); 

                }
                else
                    html+=json2table(data.GetClientes[key],data.GetMedium[key],0); 
                
	        	 
	      	}   
	      res.send(html).status(200); 
    	}
 	});
} 
 
function json2table(client,medium,cost){  
    var costs=0;

	var NewReport='<tr>';
	//We add the Source ||client.secondSource
    NewReport += ( client.nsource || client.secondSource!=null ) ? "<td>"+(client.nsource||client.secondSource)+"</td>" : "<td>N/A</td>";

    //We add gastos
    //We search for the cost AND WE ADD IT MADAFAKER :DDD
    
    NewReport += "<td>"+cost+"</td>";
    //We add ingresos
    NewReport +=(medium.revenue) ? "<td>$"+medium.revenue+"</td>" : '<td>$0</td>';

    //We add ROI
    NewReport +='<td></td>';

    //We add margen
    NewReport +='<td></td>';

    //We add Clients
    NewReport += (client.Clientes) ? "<td>"+client.Clientes+"</td>": '<td>0</td>';

    //We add cac
    NewReport +='<td></td>';

    //We add LTV
     NewReport +='<td></td>';

	NewReport +='</tr>';   
	return NewReport;
}
