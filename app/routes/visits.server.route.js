var visitsController = require("../controllers/visits.server.controller");
module.exports = function(app) { 
	app.get( "/home/funnel/visitors", visitsController.GetIndividualVisits );
	app.post( "/home/funnel/ajaxVisitors",visitsController.GetVisitsData ); 
};