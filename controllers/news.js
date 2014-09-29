/*
Author: Tu Hoang
ESRGC 2014

news controller class 

provides news action methods
requires base controller (base.js)
*/
var Class = require('../lib').Class;
var BaseController = require('../lib').BaseController;

var newsController = Class.define({
  extend: BaseController,
  _className: 'NewsController',
  //mountPath: '', //this is optional for route area, custom route...ect
  name: 'news',
  initialize: function() {
    this.extend.prototype.initialize.apply(this, arguments);
    //console.log(this.router);

  },
  get: {
    //action
    index: {
      handler: function(req, res) {
        //render view
        res.render('news/index');
      }
    }
  }
  //,
  //middlewares: []


});

module.exports = newsController;
