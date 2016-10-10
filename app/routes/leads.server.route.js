var leadsController  = require("../controllers/leads.server.controller");
var VerifyUser		 = require('../controllers/user').VerifyUser;
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
	 app.get('/funnel/leads/*',VerifyUser,leadsController.RenderLeads); 
	 app.post("/home/CountLeads*",leadsController.CountLeads);
	 app.post("/home/funnel/SetCosts*",leadsController.SetCosts);
	 app.post("/home/funnel/GetLeads*",leadsController.GetLeads); 
	 app.post("/home/GetLeadsByChannel*",leadsController.GetLeadsByChannel);
	 app.post("/home/funnel/leads/GetSale*",leadsController.GetSale);
	 app.post("/leads/Export*",leadsController.Export);
	 app.post("/leads/import/*",upload.single('file-es'), leadsController.importLeads); 
};