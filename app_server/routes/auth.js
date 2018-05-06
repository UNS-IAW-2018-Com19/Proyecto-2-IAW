/* jshint esversion: 6 */   
var express = require('express');
var router = express.Router();

const passportFacebook = require('../auth/authfb');


router.get('/login/facebook', passportFacebook.authenticate('facebook', { scope: ['user_about_me', 'user_photos', 'email', 'publish_stream']}));
router.get('/auth/facebook/callback',
passportFacebook.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });


  module.exports = router;