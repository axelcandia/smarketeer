var analyticsController = require("../controllers/analytics.core.controller");
module.exports = function(app) { 
	app.get("/analytics/nvisitors",analyticsController.GetDashboardVisits);
	app.get("/analytics/nsales",analyticsController.GetDashboardVisits);
	app.get("/analytics/nleads",analyticsController.GetDashboardVisits);
};