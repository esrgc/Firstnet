/*
Author: Tu Hoang
ESRGC 2014

account controller class 

provides authentication 
requires base controller (base.js)
*/
var Class = require('easynodemvc').Class;
var BaseController = require('easynodemvc').BaseController;
var passport = require('../lib/authentication'); //passport authentication
var flash = require('connect-flash');

var accountController = Class.define({
  extend: BaseController,
  _className: 'AccountController',
  //mountPath: '', //this is optional for route area, custom route...ect
  name: 'account',
  initialize: function() {
    this.extend.prototype.initialize.apply(this, arguments);
    //console.log(this.router);

  },
  get: {
    //action
    signin: {
      handler: function(req, res) {
        var url = req.query.url;
        if (typeof url == 'undefined')
          url = '/'; //redirects to home page if no redirection specified.
        //render view
        var message = req.flash('message');
        res.render('account/signin', {
          user: req.user,
          message: message,
          url: url
        });
      }
    },
    signout: {
      handler: function(req, res) {
        req.logout();
        req.flash('message', 'You have successfully signed out.');
        res.redirect('/');
      }
    }

  },
  post: {
    signin: {
      handler: function(req, res, next) {
        //redirects to custom url or homepage if custom url doesn't exitst
        var url = req.body.url;
        if (typeof url == 'undefined')
          url = '/';


        passport.authenticate('local', function(err, user, info) {
          console.log('Authentication info: ')
          console.log(info);
          if (err) {
            return next(err);
          }
          if (!user) {
            req.flash('message', info.message);
            return res.redirect('signin?url=' + url);
          }

          req.logIn(user, function(err) {
            if (err) {
              return next(err);
            }
            console.log('Logging in..');
            res.redirect(url);
          });
        })(req, res, next);
        //passport.authenticate('local', { failureRedirect: 'signin', failureFlash: true });

      }
    }
  }
  //,
  //middlewares: []


});


module.exports = accountController;
