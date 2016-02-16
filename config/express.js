var config = require('./config'),
    express = require('express'),
    passport = require('passport');
    bodyParser = require('body-parser');
    

module.exports = function() {
    var app = express();

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(passport.initialize());
    app.use(passport.session()); 
    app.use(bodyParser.json());

    app.set('views', './app/views');
    app.set('view engine', 'jade');

    //require('../app/routes/index.server.routes.js')(app);
    require('../app/routes/users.server.routes.js')(app);
    
    //use this code before any route definitions
    

    app.use(express.static('./public'));

    return app;
};

