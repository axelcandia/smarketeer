var uri 	= 'mongodb://db-smarketeer.cloudapp.net/SmarketeerDesa';
var db 		= require('mongoose').connect(uri);
var port 	= process.env.PORT || 1337;

module.exports = {
    port: port,
    db: 'mongodb://db-smarketeer.cloudapp.net/SmarketeerDesa'
};
