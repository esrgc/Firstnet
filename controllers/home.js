﻿/*
Author: Tu Hoang
ESRGC 2014

Home controller class 

provides home action methods
requires base controller (base.js)
*/
var Class = require('../lib').Class;
var BaseController = require('../lib').BaseController;

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
        res.render('home/index');
      }
    },
    about: {
      handler: function(req, res) {
        //render view
        res.render('home/about');
      }
    },
    governance: {
      handler: function(req, res) {
        //render view
        res.render('home/governance');
      }
    },
    process: {
      handler: function(req, res) {
        //render view
        res.render('home/process');
      }
    },
    library: {
      handler: function(req, res) {
        //render view
        res.render('home/library');
      }
    },
    news: {
      handler: function(req, res) {
        //render view
        res.render('home/news');
      }
    },
    faq: {
      handler: function(req, res) {
        //render view
        res.render('home/faq');
      }
    }
  }
  //,
  //middlewares: []


});

module.exports = homeController;
