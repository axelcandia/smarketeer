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
		token			 : "52962cd2612c7936bd53fd2eee07fa6e",
		url              : "https://legend.smarketeer.io/index.php"
	}
	/*piwik:{
		user             : "axel",
		token			 : "b587089f5dc5e681218a6a2974eec3ca",
		url              : "http://52.165.38.47/index.php"
	}*/
	
};