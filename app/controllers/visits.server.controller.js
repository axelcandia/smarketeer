var config			  = require("../../config/config");
var PiwikClient   = require('piwik-client');
var piwik         = new PiwikClient(config.piwik.url, config.piwik.token )
var url           = require('url');
var Visitors      = require("../models/visitors.server.model");
var async         = require("async");
var SolvedForms   = require("../models/solvedforms.server.model.js");
var conversion    = require("html-to-xlsx")();

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
  //Form the pages
  var data="" 
  async.series({
      visitas: function(callback){ 
            piwik.api({
                method:   'Smarketeer.getVisits',
                idSite:    req.body.idSite,
                filter_offset:page,
                filter_limit:20, 
              },callback);  
          }
      },function(err, results) {
        if(err) res.send(err);
          else{ 
            html="";  
            var key, i = 0;
            for(key in results.visitas) {
              html+=json2table(results.visitas[i],req.body.idSite);  
              i++;     
            }  
            res.send(html).status(200); 
          }

      }); 
}
/**
* REQUIRES the id and returns EVERYTHING WE HAVE ABOUT HIM 
*/
exports.GetVisitData = function(req,res,next){
  var segment= "userId=="+req.params.id
  // an example using an object instead of an array
  async.series({
      StaticProfile: function(callback){
        GetStaticProfile(req.query.idSite,segment,callback)
      },
      Forms: function(callback){ 
        GetCompletedForms(req.params.id, callback); 
      },
      DynamicProfile: function(callback){
        GetDynamicProfile(req.params.id,callback); 
      }

  },
  function(err, results) {
    console.log("Visitas"+results);
    GetProfilePicture("axelcandia2609@gmail.com",function(img){
      res.render('home/funnel/visitorprofile', {  
        idSite:       req.query.idSite,
        UserId:       req.params.id,
        totalVisits:  results.StaticProfile.totalVisits,
        visits:       results.StaticProfile.lastVisits,
        email:        (results.StaticProfile.lastVisits[0].customVariables["1"]) ? results.StaticProfile.lastVisits[0].customVariables["1"].customVariableValue1 :"",
        ventas:       (results.StaticProfile.totalConversionsByGoal && results.StaticProfile.totalConversionsByGoal["idgoal=2"]) ? results.StaticProfile.totalConversionsByGoal["idgoal=2"] : "0",
        ingresos:     (results.StaticProfile.totalRevenueByGoal && results.StaticProfile.totalRevenueByGoal["idgoal=2"]) ? results.StaticProfile.totalConversionsByGoal["idgoal=2"] :"0",
        empty:        "",
        about:        (results.DynamicProfile) ? results.DynamicProfile.about : "",
        TotalForms:   Object.keys(results.Forms).length,
        comments:     (results.DynamicProfile) ? results.DynamicProfile.comments : "", 
        img: img
      }); 

    })
    
  });
};
/**
* Static profile is all the data that we save using the tracking code
*/
function GetStaticProfile(idSite,segment,callback){
  piwik.api({
    method:   'Live.getVisitorProfile',
    idSite: idSite,
    visitorId: '',
    segment:'',
    limitVisits: '',
    segment: segment,
  },function(err,data){
    if(err){
      callback(err,null)
    }
    else{
      callback(null,data);
    }

  });
}
/**
* Dynamic is all the data that a user can change any time he wants
*/
function GetDynamicProfile(userId,callback){

  Visitors.findOne({"CookieId":userId}, function(err, profile){
      if (err) return callback(err,null);
      return callback(null,profile);
  });
} 

/**
*Receives the emails and gets all the available data from there
*/
function GetProfilePicture(email,callback){
  var path="http://picasaweb.google.com/data/entry/api/user/"+email+"?alt=json";
  http.get(path, (res) => {
        console.log(`Got response: ${res.statusCode}`);
        // consume response body 
        res.resume();
      }).on('error', (e) => {
        console.log(`Got error: ${e.message}`);
      }); 


  callback("https://lh3.googleusercontent.com/-gv7m0ub7GxA/AAAAAAAAAAI/AAAAAAAAAAA/-JuTaoSL5Ck/s64-c/112864197834983498832.jpg");
}

function GetCompletedForms(userId,callback){
  SolvedForms.find({"pkwid":userId}, function(err, profile){
      if (err) return callback(err,null);
      return callback(null,profile);
  });
}
/**
* Get the status of the visitor
*/
function GetStatus(visita){
  Visitors.findOne({ 'CookieId': visita.visitorId }, function (err, visit) {
          if (err || !visit ) NewVisitor += '<td><span class="label label-sm label-success">Lead</span></td>';
          else{  
          } 
           NewVisitor+="</tr>"; 
           return NewVisitor;
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
    method:"VisitsSummary.getVisits",
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
      console.log("VISIT THIS"+JSON.stringify(visitas));
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
/**
* It gets the information that was settet in /seemore in the "Escriba informacion personal"
* @param about
*/
exports.GetVisitorAbout= function(req,res,next){
  Visitors.findOneAndUpdate( { 'CookieId': req.body.UserId }, {"about":req.body.about}, function(error, result) {
    if(error){
      console.log(err);
    }
    console.log(result);
  });
}

exports.GetXML = function(req,res,next){
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
          
        console.log(visita);
        //Campaign name, we only display it if it was a campagin!!!
        NewVisitor+= ( visita.referer_type == 6 ) ? 
                      '<td>'+visita.referer_name+'</td>':
                      "<td></td>";

        //Source
        NewVisitor += (visita.campaign_source) ? '<td>'+visita.campaign_source+'</td>' : '<td></td>';
        
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