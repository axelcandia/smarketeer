var homeController 		= require('../controllers/home.dashboard.controller');

module.exports = function(app) {  

	app.get('/home', homeController.getHome);
	app.post('/home/GetAllVisitors*', homeController.GetAllVisitors);
	app.post('/home/GetLeads*', homeController.GetLeads);
	app.post('/home/GetSales*', homeController.GetSales);
}; 