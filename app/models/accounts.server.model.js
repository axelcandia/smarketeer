var mongoose = require('mongoose'),
	crypto = require('crypto'),
	Schema = mongoose.Schema;

var AccountsSchema = mongoose.Schema({

        name         : String,  
        user         : String,
        pass         : String,
        token        : String,
        email        : String, 
        country      : String,
        date         : Object 
});

AccountsSchema.pre('save', 
	function(next) {
		if (this.password) {
			var md5 = crypto.createHash('md5');
			this.password = md5.update(this.password).digest('hex');
		}

		next();
	}
);

AccountsSchema.methods.authenticate = function(password) {
	var md5 = crypto.createHash('md5');
	md5 = md5.update(password).digest('hex');

	return this.password === md5;
};
mongoose.model('accounts', AccountsSchema);