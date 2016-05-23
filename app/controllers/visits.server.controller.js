var config			  = require("../../config/config");
var PiwikClient   = require('piwik-client');
var piwik         = new PiwikClient(config.piwik.url, config.piwik.token )

exports.GetIndividualVisits = function ( req,res ){ 
    res.render('home/funnel/visitors', { 
      });  
}

/**
* Brings visits data by date
*/
exports.GetVisitsData =function (req,res){ 
  page=0;
  page =  ( page == 0 ) ? page  : page * 10;
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
      filter_limit:10,
    },function( err, visitas ){
      if(err) res.send("");
      //res.send(visitas);
      res.json(visitas);
      console.log(JSON.stringify(visitas));
    }); 

 /* GetProfileInformation(function(err,data){
    console.log(data.lastVisits[0]);
  });*/
}