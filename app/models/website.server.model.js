// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var websiteSchema = new mongoose.Schema({ 

    userId							: Object,
    name                            : String,
    slug							: String,
    created							: Date,
});


var Website = mongoose.model('Website', websiteSchema); 
module.exports = Website;