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
	var page= parseInt(req.body.page); 
	page =  ( page == 0 ) ? page  : page * 20; 

	Visitors.find( {email: { $exists: true } }).
	limit(20).
	skip(page).
	exec(function(err,leads){
		if(err)
			console.log(err);
		else{
			//We have to form a string with the ID we require!
			var segment="";  
        	var key, i = 0; 
        	for(key in leads) {
				segment+="userId=="+leads[i]._id+",";
				i++; 
			}
			GetInvidualLead(leads,segment,res);
		}
	});
}
 
function GetInvidualLead(mongodata,segment,res){  
  piwik.api({
      method:   'Live.getLastVisitsDetails',
      idSite: 1,
      period:   '',
      date:     '', 
      showColumns:"lastActionDateTime,visitorId,actionDetails,referrerName,referrerTypeName,referrerUrl,visitorType",
      countVisitorsToFetch : '',
      minTimestamp : '',
      flat : '',
      doNotFetchActions : '', 
      filter_limit:20,
      segment: segment,
    },function( err, visitas ){
      if(err) res.send(err);
      else{  
	        html="";  
	        var key, i = 0;
	        for(key in visitas) {
	          html+=combine2table(visitas[i],mongodata[i]); 
	          i++;     
	        } 
	        console.log(html); 
	        res.send(html).status(200); 
	      }
    }); 
}
/**
* This function gets the information of both, put it together and rock it
*/
function combine2table(visita,mongodata){
	  //First we create the href and the id
  //Parseamos la url 
  var query = url.parse(visita.actionDetails[0].url,true).query; 
  //Visitor date
   var NewVisitor='<tr>'+
              '<td>'+visita.lastActionDateTime+ '</td>';
      //Visitor ID
       NewVisitor+= '<td>'+
          '<a href="/visitors/seemore/'+visita.visitorId+'">'+
              mongodata.email +
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
         NewVisitor+='<td><input type="number"></td>';
        switch( mongodata.Status ){ 
        	case "lead":
        		default:
        			NewVisitor+='<td><span class="label label-sm label-success">Cliente potencial</span></td></tr>';
        			break;
        } 
        return NewVisitor;

} 