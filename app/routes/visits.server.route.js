var visitsController = require("../controllers/visits.server.controller"); 
var VerifyUser		 = require('../controllers/user').VerifyUser;
module.exports = function(app) { 
	app.get( "/funnel/visitors/",VerifyUser, visitsController.RenderVisitors );
	app.post( "/home/funnel/GetMoreVisitors*",visitsController.GetMoreVisitors ); 
	app.get("/visitors/seemore/:id/", visitsController.GetVisitData);
	app.post("/home/CountVisitors*",visitsController.CountVisitors);
	app.post("/visitors/seemore/GetVisitorAbout*",visitsController.GetVisitorAbout);
	app.post("/visitors/Export*",visitsController.Export);
};