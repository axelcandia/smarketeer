var homeController 		= require('../controllers/home.dashboard.controller');
var VerifyUser			= require('../controllers/user').VerifyUser;
module.exports = function(app) {  
	app.get('/home/*',VerifyUser, homeController.GetHome);  
}; 