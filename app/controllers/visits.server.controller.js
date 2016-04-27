var config			  = require("../../config/config");
var PiwikClient   = require('piwik-client');
var piwik         = new PiwikClient(config.piwik.url, config.piwik.token )

exports.GetIndividualVisits = function ( req,res ){
  GetVisitsData( 0, function(err,visitas){
    if(err) console.log(err)
    console.log( JSON.stringify( visitas) );
    res.render('home/funnel/visitors', {
        visitas: visitas
      });
  }); 
}

/**
* Brings visits data by date
*/
function GetVisitsData( page, callback ){
  page =  ( page == 0 ) ? page  : page * 10;
  piwik.api({
      method:   'Live.getLastVisitsDetails',
      idSite: 1,
      period:   '',
      date:     '',
      segment : '',
      countVisitorsToFetch : '',
      minTimestamp : '',
      flat : '',
      doNotFetchActions : '',
      filter_offset:page,
      filter_limit:10,
    },function( err, visitas ){
      if(err) callback(err,null);
      callback(null,visitas);
    }); 
 /* GetProfileInformation(function(err,data){
    console.log(data.lastVisits[0]);
  });*/
}