var visitsController = require("../controllers/visits.server.controller"); 
var VerifyUser		 = require('../controllers/user').VerifyUser;
module.exports = function(app) { 
	app.get( "/funnel/visitors/",VerifyUser, visitsController.RenderVisitors );
	app.post( "/ajaxVisitors*",visitsController.GetMoreVisitors ); 
	app.get("/visitors/seemore/:id/",VerifyUser, visitsController.GetVisitData);
	app.post("/home/CountVisitors*",visitsController.CountVisitors);
};