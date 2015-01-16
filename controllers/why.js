/*
Author: Christopher Webster
CHHS 2015

why controller class 

provides why action methods
requires base controller (base.js)
*/
var Class = require('../lib').Class;
var BaseController = require('../lib').BaseController;

var aboutController = Class.define({
  extend: BaseController,
  _className: 'WhyController',
  //mountPath: '', //this is optional for route area, custom route...ect
  name: 'why',
  initialize: function() {
    this.extend.prototype.initialize.apply(this, arguments);
    //console.log(this.router);

  },
  get: {
    //action
    index: {
      handler: function(req, res) {
        //render view
        res.render('why/index');
      }
    }
  }
  //,
  //middlewares: []


});

module.exports = aboutController;