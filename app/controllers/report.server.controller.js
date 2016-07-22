var config		     = require("../../config/config");
var PiwikClient   	 = require('piwik-client');
var piwik         	 = new PiwikClient(config.piwik.url, config.piwik.token );
var async            = require("async");
 
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

        } 
 	},function(err,data){ 
 		if(err)
 			res.send(err).status(200); 
 		else{  
	     	html="";  
	     	var key;
	     	console.log(data);
	      	for(key in data.GetClientes) {  
	        	html+=json2table(data.GetClientes[key],data.GetMedium[key]);  
	      	}   
	      res.send(html).status(200); 
    	}
 	});
} 

function json2table(client,medium){ 
	var NewReport='<tr>';
	//We add the Source 
    NewReport += (client.nsource) ? "<td>"+client.nsource+"</td>" : '<td>Entrada Directa</td>';

    //We add gastos
    NewReport +='<td></td>';

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
