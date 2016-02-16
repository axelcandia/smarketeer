var config   = require('./config');
var mongoose = require('mongoose');
var User     = require('../app/models/user.server.model');

module.exports = function() {
	//mongoose.closeConnection(config.db);
	var db = mongoose.createConnection(config.db);
    //var db = mongoose.connect(config.db);
    return db;
};


