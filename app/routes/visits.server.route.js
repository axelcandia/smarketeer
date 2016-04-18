var visitsController = require("../controllers/visits.server.controller");
module.exports = function(app) { 
	app.get( "/home/funnel/visitors", visitsController.GetTotalVisits ); 
	app.post('/home/funnel/visitors', function (req,res){
	      res.render("home/funnel/visitors");
	    }); 
};