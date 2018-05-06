
/* jshint esversion: 6 */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
var logger = require('morgan');
const passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
require('./app_server/models/db');


const indexRouter = require('./app_server/routes/index');
const usersRouter = require('./app_server/routes/users');
const apiRouter = require('./app_server/routes/api');

//passport setup

passport.use(new Strategy({
  clientID: '179829129338029',
  clientSecret: '05e2f6ba0b420e05c57b42614bf42858', 
  callbackURL: "https://e-sportstournament.herokuapp.com/auth/facebook/callback"
},
function(accessToken, refreshToken, profile, cb) {
  User.findOrCreate({ facebookId: profile.id }, function (err, user) {
    return cb(err, user);
  });
}
));



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());

app.use(require('express-session')({
  secret: 'nodejs-twig-secret',
  resave: true,
  saveUninitialized: true
}));


app.use(express.static(path.join(__dirname, 'public')));
app.use('/twigjs/twig.min.js',  express.static(__dirname + '/node_modules/twig/twig.min.js'));
app.use('/shared',  express.static(__dirname + '/app_server/views/shared'));

//routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);


//passport routes
app.use(passport.initialize());
app.use(passport.session());

app.get('/login/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
/*
app.get('/profile',
function(req, res){
  res.render('profile', { user: req.user });
});
*/
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
