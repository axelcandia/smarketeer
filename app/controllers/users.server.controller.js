var User = require('mongoose').model('User'),
	passport = require('passport');

var getErrorMessage = function(err) {
	var message = '';
	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Username already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	}
	else {
		for (var errName in err.errors) {
			if (err.errors[errName].message)
				message = err.errors[errName].message;
		}
	}

	return message;
};

exports.renderLogin = function(req, res, next) {
	if (!req.user) {
		res.render('security/login', {
			title: 'Log-in Form',
			messages: req.flash('error') || req.flash('info')
		});
	}
	else {
		return res.redirect('/home/dashboard');
	}
};

exports.renderRegister = function(req, res, next) {
	if (!req.user) {
		res.render('security/register', {
			title: 'Register Form',
			messages: req.flash('error')
		});
	}
	else {
		return res.redirect('/home/dashboard');
	}
};

exports.register = function(req, res, next) {
	if (!req.user) {
		var user = new User(req.body);
		var message = null;
		user.provider = 'local';
		user.save(function(err) {
			if (err) {
				var message = getErrorMessage(err);
				req.flash('error', message);
				return res.redirect('/register');
			}	

			req.login(user, function(err) {
				if (err) 
					return next(err);
				
				return res.redirect('/home/dashboard');
			});
		});
	}
	else {
		return res.redirect('/');
	}
};

exports.logout = function(req, res) {
	req.logout();
	res.redirect('/');
};


exports.create = function(req, res, next) {	
	var user = new User(req.body);
	user.save(function(err) {
		if (err) {
			return next(err);
		}
		else {
			res.json(user);
		}
	});
};

exports.list = function(req, res, next) {
	User.find({}, function(err, users) {
		if (err) {
			return next(err);
		}
		else {
			res.json(users);
		}
	});
};

exports.read = function(req, res) {
	res.json(req.user);
};

exports.userByID = function(req, res, next, id) {
	User.findOne({
			_id: id
		}, 
		function(err, user) {
			if (err) {
				return next(err);
			}
			else {
				req.user = user;
				next();
			}
		}
	);
};

exports.update = function(req, res, next) {
	User.findByIdAndUpdate(req.user.id, req.body, function(err, user) {
		if (err) {
			return next(err);
		}
		else {
			res.json(user);
		}
	});
};

exports.delete = function(req, res, next) {
	req.user.remove(function(err) {
		if (err) {
			return next(err);
		}
		else {
			res.json(req.user);
		}
	})
};

exports.isLoggedIn =function (req, res, next) { 
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();
    //TODO: Add error?
    // if they aren't redirect them to the home page
    res.redirect('/login');
}
