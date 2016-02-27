var dashboard 	= require('../../app/controllers/dashboard.server.controller'),
	user		= require('../../app/controllers/users.server.controller'),
	passport 	= require('passport'); 

module.exports = function(app) {
	 
	 app.get('/home/dashboard', user.isLoggedIn, function(req, res) {
        res.render('home/index', {
            user : req.user // get the user out of session and pass to template
        });
    }); 
};