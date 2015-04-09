/*
Author: Tu Hoang
ESRGC 2014

Firstnet application

*/

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var layouts = require('express-ejs-layouts');
var session = require('express-session');
var multer = require('multer');

//authentication modules
var flash = require('connect-flash'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

//var partials = require('express-partials');
//routes 
var registerRoutes = require('easynodemvc').Routes.registerRoutes;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/egov/img/icons/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(multer({
//  dest: '/public/uploads/', //upload dir
//  rename: function(fieldname, filename) {
//    return filename + Date.now(); //return name
//  }
//}));
app.use(cookieParser());

/*
  session and passport authentication
*/
app.use(session({ secret: 'firstnet session secret', resave: false, saveUninitialized: false }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.set('layout', 'layout.html');//default to layout
app.set("layout extractScripts", true);
//set express-ejs-layout middleware
//app.use(partials);
app.use(layouts);

//routes configurations
registerRoutes(app, 'home/index');//default to /index.html when root url is requested

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
