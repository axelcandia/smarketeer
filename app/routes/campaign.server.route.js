var campaignController = require("../controllers/campaign.server.controller");
var VerifyUser		   = require('../controllers/user').VerifyUser; 
var multer  = require('multer')
var upload = multer()
module.exports = function(app) { 
	app.get( "/campaigns/seeall",VerifyUser, campaignController.RenderGetAll ); 
	app.get("/campaigns/new", campaignController.RenderGetNew );
	app.get("/campaigns/seemore/:id/",VerifyUser, campaignController.RenderSeeMore );
	app.post("/campaigns/save", campaignController.SaveCampaign ); 
	app.post("/campaigns/import/*",upload.any, campaignController.importCampaign ); 
};