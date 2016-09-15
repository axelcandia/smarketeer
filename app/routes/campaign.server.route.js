var campaignController = require("../controllers/campaign.server.controller");
var VerifyUser		   = require('../controllers/user').VerifyUser; 
var multer  		   = require('multer');
var crypto 			   = require("crypto"); 
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './tmp/')
  },
  filename: function (req, file, cb) { 
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + Date.now() + '.' + file.originalname.split('.')[file.originalname.split('.').length -1] );
    });
  }
});
var upload = multer({ storage: storage });
module.exports = function(app) { 
	app.get( "/campaigns/seeall",VerifyUser, campaignController.RenderGetAll ); 
	app.get("/campaigns/new", campaignController.RenderGetNew );
	app.get("/campaigns/seemore/:id/",VerifyUser, campaignController.RenderSeeMore );
	app.post("/campaigns/save", campaignController.SaveCampaign ); 
	app.post("/campaigns/import/*",upload.single('file-es'), campaignController.importCampaign ); 
};