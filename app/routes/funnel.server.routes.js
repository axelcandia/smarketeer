module.exports = function(app) {

	app.get('',function (req,res){
			res.render("home/funnel/leads");
		});
		app.get('/home/funnel/sales',function (req,res){
			res.render(path.join( __dirname + "/app/views/home/funnel/sales"));
		});
		app.get('/home/funnel/visitors',function (req,res){
			res.render(path.join( __dirname + "/app/views/home/funnel/visitors"));
		}); 


		app.get('/home/funnel/leads', function(req, res) {
		if (req.session.user == null){
	// if user is not logged-in redirect back to login page //
			res.redirect('/');
		}	else{
			res.render('home/funnel/leads', {
				title : 'Control Panel',
				countries : CT,
				udata : req.session.user
			});
		}
	});
	
	app.post('/home/funnel/leads', function(req, res){
		if (req.session.user == null){
			res.redirect('/');
		}	else{
			AM.updateAccount({
				id		: req.session.user._id,
				name	: req.body['name'],
				email	: req.body['email'],
				pass	: req.body['pass'],
				country	: req.body['country']
			}, function(e, o){
				if (e){
					res.status(400).send('error-updating-account');
				}	else{
					req.session.user = o;
			// update the user's login cookies if they exists //
					if (req.cookies.user != undefined && req.cookies.pass != undefined){
						res.cookie('user', o.user, { maxAge: 900000 });
						res.cookie('pass', o.pass, { maxAge: 900000 });	
					}
					res.status(200).send('ok');
				}
			});
		}
	});
}