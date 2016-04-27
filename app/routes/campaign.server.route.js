var campaignController = require("../controllers/campaign.server.controller");

module.exports = function(app) { 
	app.get( "/campaigns/seeall", campaignController.RenderGetAll ); 
	app.get("/campaigns/new", campaignController.RenderGetNew );
	app.get("/campaigns/seemore/:id/", campaignController.RenderSeeMore );
	app.post("/campaigns/save", campaignController.SaveCampaign );
	app.get("/campaigns/eliminar/:id", campaignController.DeleteCampaign );
};