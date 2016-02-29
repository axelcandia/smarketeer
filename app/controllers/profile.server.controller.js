var User = require('mongoose').model('User');

exports.renderProfile = function(req, res, next) {
	if (!req.session.isPopulated) {
		res.render('security/login', {
			title: 'Log-in Form',
			messages: req.flash('error') || req.flash('info')
		});
	}
	else {
		return res.redirect('/user/MyProfile');
	}
}; 