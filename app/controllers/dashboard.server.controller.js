var passport = require('passport');


exports.renderDashboards = function(req, res, next) {
	if (!req.user) {
		res.render('/home/dashboard', {
			title: 'Log-in Form',
			messages: req.flash('error') || req.flash('info')
		});
	}
	else {
		return res.redirect('/user/MyPlan');
	}
};

exports.renderMyProfile = function(req, res, next) {
	if (!req.user) {
		res.render('/user/MyPlan', {
			title: 'Log-in Form',
			messages: req.flash('error') || req.flash('info')
		});
	}
	else {
		return res.redirect('/user/MyPlan');
	}
};