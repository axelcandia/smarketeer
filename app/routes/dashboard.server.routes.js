var dashboard = require('../../app/controllers/dashboard.server.controller'),
	passport = require('passport'); 

module.exports = function(app) {
	 

	  app.get('/home/dashboard', function(req, res){
      if (true){
           res.render('user/MyProfile', {title: 'Add your Email'});}
      else {res.redirect('home/index');}
  });
};