/* jshint esversion: 6 */
const passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
var User = require('../models/users');
var findOrCreate = require('mongoose-findorcreate');
//passport setup

passport.use(new Strategy({
    clientID: '179829129338029',
    clientSecret: '05e2f6ba0b420e05c57b42614bf42858', 
    callbackURL: "https://e-sportstournament.herokuapp.com/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({name: profile.displayName}, {name: profile.displayName,userid: profile.id}, function(err, user) {
        if (err) { return done(err); }
        done(null, user);
      });
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  module.exports = passport;
  
 



