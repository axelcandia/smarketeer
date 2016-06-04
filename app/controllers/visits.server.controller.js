var config			  = require("../../config/config");
var PiwikClient   = require('piwik-client');
var piwik         = new PiwikClient(config.piwik.url, config.piwik.token )

exports.RenderVisitors = function ( req,res ){ 
    res.render('home/funnel/visitors', { 
      });  
}

/**
* Brings visits data by date
*/
exports.GetMoreVisitors =function (req,res){ 
  var page= req.body.page; 
console.log(page);
  page =  ( page == 0 ) ? page  : page * 20;
  piwik.api({
      method:   'Live.getLastVisitsDetails',
      idSite: 1,
      period:   '',
      date:     '',
      segment : '',
      showColumns:"visitorId,actionDetails,referrerName,referrerTypeName,referrerUrl",
      countVisitorsToFetch : '',
      minTimestamp : '',
      flat : '',
      doNotFetchActions : '',
      filter_offset:page,
      filter_limit:20,
    },function( err, visitas ){
      if(err) res.send(err);
      else{ 
        console.log(JSON.stringify(visitas));
        html="";  
        var key, i = 0;
        for(key in visitas) { 
          html+=json2table(visitas[i]); 
          i++;    
        //console.log(JSON.stringify(visitas)); 
        } 
        res.send(html).status(200); 
      }
    }); 

 /* GetProfileInformation(function(err,data){
    console.log(data.lastVisits[0]);
  });*/
}

exports.GetVisitData = function(req,res,next){

}

function json2table(visita){
  //First we create the href and the id
   var NewVisitor='<tr>'+
        '<td>'+
          '<a href="/visitors/seemore/'+visita.visitorId+'">'+
              visita.visitorId +
          '</a>'+
        '</td>';

        //Now we create the campaign name, we only display it if it was a campagin!!!
        NewVisitor+= (visita.referrerTypeName =="Campaigns") ? 
                      '<td>'+visita.referrerName+'</td>':
                      "<td></td>";
        //NewVisitor+= () ? : ;
        '<td>'+visita.referrerTypeName+'</td>';
        //Si no hay referrer devolver un espacio en blanco
        if(visita.referrerName && visita.referrerUrl!=null )
          NewVisitor +='<td>'+visita.referrerUrl+'</td>';
        else
          NewVisitor +='<td></td>';
        NewVisitor+="<td>facebook.com</td>"+
           '<td>'+visita.actionDetails[0].url+'</td>'+//landing page
        '<td>'+
          '<input type="number" value=""/>'+
        '</td>';

        NewVisitor   += '<td><span class="label label-sm label-success">Sold</span></td>'+
      '</tr>'; 
    return NewVisitor;
}