/*
Author: Tu Hoang
ESRGC 2014

Home controller class 

provides home action methods
requires base controller (base.js)
*/
var Class = require('easynodemvc').Class;
var BaseController = require('easynodemvc').BaseController;

var homeController = Class.define({
  extend: BaseController,
  _className: 'HomeController',
  //mountPath: '', //this is optional for route area, custom route...ect
  name: 'home',
  initialize: function() {
    this.extend.prototype.initialize.apply(this, arguments);
    //console.log(this.router);

  },
  get: {
    //action
    index: {
      handler: function(req, res) {
        //render view
        res.render('home/index', { user: req.user });
      }
    }
  }
  //,
  //middlewares: []


});

module.exports = homeController;
