/*
Author: Tu Hoang
ESRGC 2014

process controller class 

provides process action methods
requires base controller (base.js)
*/
var Class = require('../lib').Class;
var BaseController = require('../lib').BaseController;

var processController = Class.define({
  extend: BaseController,
  _className: 'ProcessController',
  //mountPath: '', //this is optional for route area, custom route...ect
  name: 'process',
  initialize: function() {
    this.extend.prototype.initialize.apply(this, arguments);
    //console.log(this.router);

  },
  get: {
    //action
    index: {
      handler: function(req, res) {
        //render view
        res.render('process/index');
      }
    }
   
  }
  //,
  //middlewares: []


});

module.exports = processController;
