var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars');
var session = require('express-session');

var routes = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/auth')
var profile = require('./routes/profile')
var theaters = require( './routes/theaters' )
var movie = require( './routes/movie' )
var movie_by_theater = require( './routes/movies' )

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.engine( 'handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

// Set up session handling
app.set( 'trust proxy', 1 )
app.use( session({
  secret: process.env.SESSION_SECRET,
  cookie: {}
}))

app.use('/', routes);
app.use('/users', users);
app.use('/auth', auth);
app.use('/profile', profile);
app.use('/theaters', theaters );
app.use('/movie', movie );
app.use('/movies', movie_by_theater );

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
