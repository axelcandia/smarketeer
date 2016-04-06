var homeController 		= require('../controllers/home.dashboard.controller');

module.exports = function(app) { 

app.get('/home', homeController.getHome);
//app.post('/login', userController.postHome);
}; 