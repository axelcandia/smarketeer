var analyticsController = require("../controllers/analytics.core.controller");
module.exports = function(app) { 
	app.get("/analytics/visitors",analyticsController.GetDashboardVisits);

};