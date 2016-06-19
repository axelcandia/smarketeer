var _           = require('lodash');
var async       = require('async');
var crypto      = require('crypto');
var nodemailer  = require('nodemailer');
var passport    = require('passport');
var User        = require('../models/user.server.model'); 
var config      = require("../../config/config");
var PiwikClient = require('piwik-client');
var piwik       = new PiwikClient(config.piwik.url, config.piwik.token );
var Q           = require("q");
var url         = require('url');

exports.getLogin = function(req, res) {
  if (req.user) {
    return res.redirect('/home');
  }
  res.render('security/login', {
    title: 'Login'
  });
}

/**
 * POST /login
 * Sign in using email and password.
 */
exports.postLogin = function(req, res, next) {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', 'Password cannot be blank').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/login');
  }
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash('errors', { msg: info.message });
      return res.redirect('/login');
    }
    console.log(user);
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      req.flash('success', { msg: 'Success! You are logged in.' });
      res.redirect(req.session.returnTo || '/home');
    });
  })(req, res, next);
};

/**
 * GET /logout
 * Log out.
 */
exports.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};

/**
 * GET /signup
 * Signup page.
 */
exports.getSignup = function(req, res) {
  if (req.user) {
    return res.redirect('/home');
  }
  res.render('security/signup', {
    title: 'Create Account'
  });
};

/**
 * POST /signup
 * Create a new local account.
 */
exports.postSignup = function(req, res, next) {
  req.assert('email', 'Email no valido').isEmail();
  req.assert('password', 'La contraseña tiene que tener minimo 4 digitos').len(4);
  req.assert('rpassword', 'Las contraseñas no coinciden').equals(req.body.password);
  req.assert('website', "Pagina web invalida").len(1);
  var errors = req.validationErrors();
    if (errors) {
    req.flash('errors', errors);
    return res.redirect('/signup');
  } 
  SetPiwikUser(req,res);

}

/**
* Rquires the req data, it sets the user in piwik BUUUT it does not set any personal infortmation
* Or the website please add this information in other fields :DDD
*/
function SetPiwikUser( req,res ){ 
  piwik.api({
      method: "UsersManager.addUser",
      userLogin:req.body.username,
      password:req.body.password,
      email:req.body.email,
      alias:req.body.username
    },function(err,data){
      if(err){ 
        req.assert('error', err).len(1);
        var errors = req.validationErrors();
        req.flash('errors', errors);  
        res.redirect('/signup'); 
      } 
      //Continue the party
      else
        SetPiwikWebsite( req, res);
    });
}
/**
* Creates the website
*/
function SetPiwikWebsite( req, res ){ 
    piwik.api({
        method: "SitesManager.addSite",
        siteName: req.body.website,
        urls: req.body.website ,
        ecommerce : '',
        siteSearch : '',
        searchKeywordParameters : '',
        searchCategoryParameters : '',
        excludedIps : '',
        excludedQueryParameters : '',
        timezone : '',
        currency : '',
        group : '',
        startDate : 'today',
        excludedUserAgents : '',
        keepURLFragments : '',
        type : '',
        settings : '',
        excludeUnknownUrls : ''
      },function(err,data){
        if(err){   
          req.assert('error', err).len(1);
          var errors = req.validationErrors();
          req.flash('errors', errors);   
          return res.redirect('/signup');
        }  
        else{   
          Q.fcall(JoinWebsiteUser(req,res,data.value))
          .then(SetMongoUser(req,res)) 
          .then(SetFunnelGoal(data.value));
        } 
      });  
    
}
/**
* Links the website with the user created
*/ 
function JoinWebsiteUser( req, res,id ){ 
  piwik.api({
      method: "UsersManager.setUserAccess",
      userLogin:req.body.username,
      access:"admin",
      idSites:id
    },function(err){
      if(err){  
        req.assert('error', err).len(1);
        var errors = req.validationErrors();
        req.flash('errors', errors);   
        return res.redirect('/signup');
      }
    });  
}

/**
* Sets the MongoUser
*/
function SetMongoUser( req, res ){
    var user = new User({
      profile:{
        username:req.body.username
      },
    email: req.body.email,
    password: req.body.password,
    mainWebsite: req.body.website,
    
  });

  User.findOne({ email: req.body.email }, function(err, existingUser) {
    if (existingUser) {    
        req.assert('error', "Ya existe un usuario con esta cuenta").len(1);
        var errors = req.validationErrors();
        req.flash('errors', errors); 
        res.redirect('/signup');
    }
    else
      user.save(function(err) { 
        if(err)
          return res.redirect('/signup'); 
          req.logIn(user, function(err) {
            if (err) {
              return next(err);
            }
            return res.redirect('/home');
          });
      });

  });
}
/**
* Adds the goal of funnel to the website
* We set an impossible pattern in order to change it manually
*/
function SetFunnelGoal( idsite ){
  piwik.api({
        method: "Goals.addGoal",
        idSite:idsite,
        name:"Leads",
        matchAttribute:"url",
        pattern:"is exactly",
        patternType:"-1",
        caseSensitive: '',
        revenue: '',
        allowMultipleConversionsPerVisit: true
      },function(err,data){
        if(err){  
          console.log(err); 
        }  
      });
  
   piwik.api({
        method: "Goals.addGoal",
        idSite:idsite,
        name:"Venta",
        matchAttribute:"url",
        pattern:"is exactly",
        patternType:"-1",
        caseSensitive: '',
        revenue: '',
        allowMultipleConversionsPerVisit: true
      },function(err,data){
        if(err){  
          console.log(err); 
        }  
      });
}

/**
 * GET /account
 * Profile page.
 */
exports.getAccount = function(req, res) {
  res.render('security/profile', {
    title: 'Account Management'
  });
};

/**
 * POST /account/profile
 * Update profile information.
 */
exports.postUpdateProfile = function(req, res, next) {
  User.findById(req.user.id, function(err, user) {
    if (err) {
      return next(err);
    }
    user.email = req.body.email || '';
    user.profile.name = req.body.name || '';
    user.profile.gender = req.body.gender || '';
    user.profile.location = req.body.location || '';
    user.profile.website = req.body.website || '';
    user.save(function(err) {
      if (err) {
        return next(err);
      }
      req.flash('success', { msg: 'Profile information updated.' });
      res.redirect('/account');
    });
  });
};

/**
 * POST /account/password
 * Update current password.
 */
exports.postUpdatePassword = function(req, res, next) {
  req.assert('password', 'Password must be at least 4 characters long').len(4);
  req.assert('confirmPassword', 'La contraseñas no coinciden').equals(req.body.password);

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/account');
  }

  User.findById(req.user.id, function(err, user) {
    if (err) {
      return next(err);
    }
    user.password = req.body.password;
    user.save(function(err) {
      if (err) {
        return next(err);
      }
      req.flash('success', { msg: 'Password has been changed.' });
      res.redirect('/account');
    });
  });
};

/**
 * POST /account/delete
 * Delete user account.
 */
exports.postDeleteAccount = function(req, res, next) {
  User.remove({ _id: req.user.id }, function(err) {
    if (err) {
      return next(err);
    }
    req.logout();
    req.flash('info', { msg: 'Your account has been deleted.' });
    res.redirect('/');
  });
};

/**
 * GET /account/unlink/:provider
 * Unlink OAuth provider.
 */
exports.getOauthUnlink = function(req, res, next) {
  var provider = req.params.provider;
  User.findById(req.user.id, function(err, user) {
    if (err) {
      return next(err);
    }
    user[provider] = undefined;
    user.tokens = _.reject(user.tokens, function(token) { return token.kind === provider; });
    user.save(function(err) {
      if (err) return next(err);
      req.flash('info', { msg: provider + ' account has been unlinked.' });
      res.redirect('/account');
    });
  });
};

/**
 * GET /reset/:token
 * Reset Password page.
 */
exports.getReset = function(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  User
    .findOne({ passwordResetToken: req.params.token })
    .where('passwordResetExpires').gt(Date.now())
    .exec(function(err, user) {
      if (err) {
        return next(err);
      }
      if (!user) {
        req.flash('errors', { msg: "El usuario/contraseña es incorrecto" });
        return res.redirect('/forgot');
      }
      res.render('security/reset', {
        title: 'Password Reset'
      });
    });
};

/**
 * POST /reset/:token
 * Process the reset password request.
 */
exports.postReset = function(req, res, next) {
  req.assert('password', 'La contraseña tiene que tener minimo 4 digitos').len(4);
  req.assert('confirm', 'Las contraseñas no coinciden').equals(req.body.password);

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('back');
  }

  async.waterfall([
    function(done) {
      User
        .findOne({ passwordResetToken: req.params.token })
        .where('passwordResetExpires').gt(Date.now())
        .exec(function(err, user) {
          if (err) {
            return next(err);
          }
          if (!user) {
            req.flash('errors', { msg: 'Por razones de seguirdad finalizamos su sesion. Por favor vuelva a iniciar' });
            return res.redirect('back');
          }
          user.password = req.body.password;
          user.passwordResetToken = undefined;
          user.passwordResetExpires = undefined;
          user.save(function(err) {
            if (err) {
              return next(err);
            }
            req.logIn(user, function(err) {
              done(err, user);
            });
          });
        });
    },
    function(user, done) {
      var transporter = nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USER,
          pass: process.env.SENDGRID_PASSWORD
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'hackathon@starter.com',
        subject: 'Your Hackathon Starter password has been changed',
        text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
      };
      transporter.sendMail(mailOptions, function(err) {
        req.flash('success', { msg: 'Exito! Recibiras un mail para cambiar tu contraseña en los proximos minutos' });
        done(err);
      });
    }
  ], function(err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};

/**
 * GET /forgot
 * Forgot Password page.
 */
exports.getForgot = function(req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  res.render('security/forgot', {
    title: 'Forgot Password'
  });
};

/**
 * POST /forgot
 * Create a random token, then the send user an email with a reset link.
 */
exports.postForgot = function(req, res, next) {
  req.assert('email', 'Por favor escriba su email').isEmail();

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/forgot');
  }

  async.waterfall([
    function(done) {
      crypto.randomBytes(16, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      User.findOne({ email: req.body.email.toLowerCase() }, function(err, user) {
        if (!user) {
          req.flash('errors', { msg: 'No existe ninguna cuenta con ese email' });
          return res.redirect('/forgot');
        }
        user.passwordResetToken = token;
        user.passwordResetExpires = Date.now() + 3600000; // 1 hour
        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
      var transporter = nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USER,
          pass: process.env.SENDGRID_PASSWORD
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'hackathon@starter.com',
        subject: 'Reset your password on Hackathon Starter',
        text: 'You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      transporter.sendMail(mailOptions, function(err) {
        req.flash('info', { msg: 'An e-mail has been sent to ' + user.email + ' with further instructions.' });
        done(err, 'done');
      });
    }
  ], function(err) {
    if (err) {
      return next(err);
    }
    res.redirect('/forgot');
  });
};