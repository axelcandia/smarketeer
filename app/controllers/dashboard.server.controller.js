var passport = require('passport');
 

exports.renderDashboard = function(req, res, next) {
	if (!req.session.isPopulated) {
		res.render('security/login', {
			title: 'Log-in Form',
			messages: req.flash('error') || req.flash('info')
		});
	}
	else { 
		res.render('home/Dashboard', {
			title: 'Log-in Form',
			username: "holuuu",
			messages: req.flash('error') || req.flash('info')
		});  
	}
};