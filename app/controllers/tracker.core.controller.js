var User        = require('../models/User');

exports.receiveData = function(req,res) {
	var obj = {};
obj.title = 'title';
obj.data = 'data'; 
	res.jsonp(obj);
	    console.log("The information was received correctly");
	    console.log('params: ' + JSON.stringify(req.params));
console.log('body: ' + JSON.stringify(req.body));
console.log('query: ' + JSON.stringify(req.query.data));

	    var user = new User({
    email: req.query.data

  });
	    user.save();
} 


