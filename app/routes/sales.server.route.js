var salesController = require("../controllers/sales.server.controller");
var VerifyUser		 = require('../controllers/user').VerifyUser;
 var multer        = require('multer');
var crypto         = require("crypto"); 

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
	app.get( "/funnel/sales*",VerifyUser, salesController.RenderSales );
	app.post( "/home/funnel/GetSales*",salesController.GetSales );
	app.post("/home/CountSales*",salesController.CountSales);
	app.post("/home/GetSalesByChannel*",salesController.GetSalesByChannel); 
	app.post("/sales/Export*",salesController.Export); 
  app.post("/sales/import/*",upload.single('file-es'), salesController.importSales); 
}; 