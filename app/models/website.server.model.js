// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var websiteSchema = mongoose.Schema({
{

    userId							: ObjectId,
    slug							: String, //short path to acces
    created							: Date,
    visitors						:{
    	facebook{ 

    		count					:{
    			firstIneraction 	: Integer,
    			linear				: Integer,
    			lastIneraction 		: Integer
    			all 				: Integer
    		}

    		active					: Boolean
    	},
    	twitter{
    		count					:{
    			firstIneraction 	: Integer,
    			linear				: Integer,
    			lastIneraction 		: Integer
    			all 				: Integer
    		}

    		active					: Boolean
    	},
    	instagram{
    		count					:{
    			firstIneraction 	: Integer,
    			linear				: Integer,
    			lastIneraction 		: Integer
    			all 				: Integer
    		}

    		active					: Boolean
    	},
    	googlePlus{
    		count					:{
    			firstIneraction 	: Integer,
    			linear				: Integer,
    			lastIneraction 		: Integer
    			all 				: Integer
    		}

    		active					: Boolean
    	},

    	total						: Integer
    }
    leads						:{
    	facebook{ 

    		count					:{
    			firstIneraction 	: Integer,
    			linear				: Integer,
    			lastIneraction 		: Integer
    			all 				: Integer
    		}

    		active					: Boolean
    	},
    	twitter{
    		count					:{
    			firstIneraction 	: Integer,
    			linear				: Integer,
    			lastIneraction 		: Integer
    			all 				: Integer
    		}

    		active					: Boolean
    	},
    	instagram{
    		count					:{
    			firstIneraction 	: Integer,
    			linear				: Integer,
    			lastIneraction 		: Integer
    			all 				: Integer
    		}

    		active					: Boolean
    	},
    	googlePlus{
    		count					:{
    			firstIneraction 	: Integer,
    			linear				: Integer,
    			lastIneraction 		: Integer
    			all 				: Integer
    		}

    		active					: Boolean
    	},

    	total						: Integer
    }
    sales						:{
    	facebook{ 

    		count					:{
    			firstIneraction 	: Integer,
    			linear				: Integer,
    			lastIneraction 		: Integer
    			all 				: Integer
    		}

    		active					: Boolean
    	},
    	twitter{
    		count					:{
    			firstIneraction 	: Integer,
    			linear				: Integer,
    			lastIneraction 		: Integer
    			all 				: Integer
    		}

    		active					: Boolean
    	},
    	instagram{
    		count					:{
    			firstIneraction 	: Integer,
    			linear				: Integer,
    			lastIneraction 		: Integer
    			all 				: Integer
    		}

    		active					: Boolean
    	},
    	googlePlus{
    		count					:{
    			firstIneraction 	: Integer,
    			linear				: Integer,
    			lastIneraction 		: Integer
    			all 				: Integer
    		}

    		active					: Boolean
    	},

    	total						: Integer
    }
}

module.exports = mongoose.model('website', websiteSchema);