var config = require('./config'),
	mongoose = require('mongoose');

module.exports = function() {
	var db = mongoose.connect(config.db);
	//Models
	require('../app/models/accounts.server.model');
	//require('../app/models/credentials.server.model');
	//require('../app/models/website.server.model');
	return db;
};