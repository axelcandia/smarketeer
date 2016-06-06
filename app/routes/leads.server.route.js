
var leadsController = require("../controllers/leads.server.controller");
module.exports = function(app) { 
	 app.get('/home/funnel/leads',leadsController.RenderLeads); 
	 app.post("/home/funnel/ajaxLeads*",leadsController.GetLeads);
	 app.post("/home/funnel/SetCosts*",leadsController.SetCosts);
};