var port = process.env.PORT || 1337;

module.exports = {
	port: port,
	secret:"SoyUnSuperSecretoSHHHHHH",
	db: 'mongodb://db-smarketeer.cloudapp.net/Development',
	facebook : {
		clientID 		: '1539348089726612', // your App ID
		clientSecret 	: '3cf68a04a1859ab4ab158a54ef34f4fe', // your App Secret
		callbackURL 	: 'http://localhost:1337/auth/facebook/callback'
	},
	twitter : {
		consumerKey		: '5H9sw7LGU9ZQekpdl1HKH7ob2',
		consumerSecret 	: 'il8xYuImWL2KiTlo8ToC7rQSAY2DIUIHYpgz6s8UiCaVqvl452',
		callbackURL 	: 'http://localhost:1337/auth/twitter/callback'
	},

	google : {
		clientID 		: '881118608327-96r85v4lv03mo8amu62ah289qqbrrpal.apps.googleusercontent.com',
		clientSecret 	: "MrFvZ7oJX2v2z765ahnl429T",
		callbackURL 	: 'http://localhost:1337/auth/google/callback'
	},
	piwik:{
		user             : "Axel",
		token			 : "9dfa00d50370c6e2f533e375ff282a97",
		url              : "http://13.88.181.254/index.php"
	},
	hubspot:{
		clientID:"4d56f0ba-439e-4c16-a1b2-7d76530978a6",
		clientSecret:"3182730b-6c63-4d1b-825b-2b82f292bf44",
		apppID:"37627",
		callbackURL 	: 'http://localhost:1337/auth/hubspot/callback'
	} 
};