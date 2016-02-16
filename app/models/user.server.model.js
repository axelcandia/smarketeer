var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String,
     email: {
	    type: String,
	    index: true
  		},
    username: {
	    type: String,
	    unique: true
  	},
    password: String,

});

mongoose.model('User', UserSchema);
