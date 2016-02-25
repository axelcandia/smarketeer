var port = process.env.PORT || 1337;

module.exports = {
	port: port,
	db: 'mongodb://db-smarketeer.cloudapp.net/Production',
	facebook: {
		clientID: '1539348089726612',
		clientSecret: '3cf68a04a1859ab4ab158a54ef34f4fe',
		callbackURL: 'http://smarketeer.io/oauth/facebook/callback'
	},
	twitter: {
		clientID: 'yFntGKkvMZkDKL47XGtzLNdRA',
		clientSecret: 'EAiPTjPYLX5nrkpRtxYQflbWpRTqqLwwBHRLh7WpdQ1P69Tre6',
		callbackURL: 'http://smarketeer.io/oauth/twitter/callback'
	}
};