var visitsController = require("../controllers/visits.server.controller");
module.exports = function(app) { 
	app.get( "/home/funnel/visitors", visitsController.RenderVisitors );
	app.post( "/home/funnel/ajaxVisitors*",visitsController.GetMoreVisitors ); 
	app.get("/visitors/seemore/:id",visitsController.GetVisitData);
	
};