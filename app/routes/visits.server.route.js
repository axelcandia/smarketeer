var visitsController = require("../controllers/visits.server.controller"); 
module.exports = function(app) { 
	app.get( "/:name/:WebsiteId/home/funnel/visitors", visitsController.RenderVisitors );
	app.post( "/home/funnel/ajaxVisitors*",visitsController.GetMoreVisitors ); 
	app.get("/:name/:WebsiteId/visitors/seemore/:id", visitsController.GetVisitData);
	
};