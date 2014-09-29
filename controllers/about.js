/*
Author: Tu Hoang
ESRGC 2014

about controller class 

provides about action methods
requires base controller (base.js)
*/
var Class = require('../lib').Class;
var BaseController = require('../lib').BaseController;

var aboutController = Class.define({
  extend: BaseController,
  _className: 'AboutController',
  //mountPath: '', //this is optional for route area, custom route...ect
  name: 'about',
  initialize: function() {
    this.extend.prototype.initialize.apply(this, arguments);
    //console.log(this.router);

  },
  get: {
    //action
    index: {
      handler: function(req, res) {
        //render view
        res.render('about/index');
      }
    }
  }
  //,
  //middlewares: []


});

module.exports = aboutController;
