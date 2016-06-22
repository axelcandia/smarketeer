var homeController 		= require('../controllers/home.dashboard.controller');

module.exports = function(app) {  
	app.get('/:name/:WebsiteId/home', homeController.getHome);
	app.post('/home/GetAllVisitors*', homeController.GetAllVisitors);  
}; 