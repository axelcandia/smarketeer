var port = process.env.PORT || 1337;

module.exports = {
	port: port,
	db: 'mongodb://db-smarketeer.cloudapp.net/Production',
	facebook : {
		clientID 		: '1539348089726612', // your App ID
		clientSecret 	: '3cf68a04a1859ab4ab158a54ef34f4fe', // your App Secret
		callbackURL 	: 'http://smarketeer.io/auth/facebook/callback'
	},
	twitter : {
		consumerKey		: 'your-consumer-key-here',
		consumerSecret 	: 'your-client-secret-here',
		callbackURL 	: 'http://smarketeer.io/auth/twitter/callback'
	},

	google : {
		clientID 		: 'your-secret-clientID-here',
		clientSecret 	: 'your-client-secret-here',
		callbackURL 	: 'http://smarketeer.io/auth/google/callback'
	}


	
};