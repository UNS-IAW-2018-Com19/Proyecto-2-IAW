/* jshint esversion: 6 */
const passport = require('passport');
const mongoose = require('mongoose');
var Strategy = require('passport-facebook').Strategy;
var User = require('../models/users');

passport.use(new Strategy({
    clientID: '179829129338029',
    clientSecret: '05e2f6ba0b420e05c57b42614bf42858', 
    callbackURL: "https://e-sportstournament.herokuapp.com/auth/facebook/callback",
    profileFields: ['id', 'emails', 'name'] 
  },
  function(accessToken, refreshToken, profile, done) {
    //check user table for anyone with a facebook ID of profile.id
    User.findOne({
        'facebookid': profile.id 
    }, function(err, user) {
        if (err) {
            return done(err);
        }
        //No user was found... so create a new user with values from Facebook (all the profile. stuff)
        if (!user) {
            user = new User({
                username: profile.displayName,
                facebookid: profile.id,
                email: profile.emails[0].value,
                //now in the future searching on User.findOne({'facebook.id': profile.id } will match because of this next line
                facebook: profile._json
            });
            user.save(function(err) {
                if (err) console.log(err);
            });
        } 
        console.log(user.email);
            //found user. Return
        return done(err, user);
        
    });
  }));

  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  module.exports = passport;
  


