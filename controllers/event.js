/*
Author: Tu Hoang
ESRGC 2015

Event controller class 

*/

var lib = require('easynodemvc');
var Class = lib.Class;
var BaseController = lib.BaseController;

var eventController = Class.define({
  extend: BaseController,
  name: 'event',
  _className: 'EventController',
  initialize: function() {
    this.extend.prototype.initialize.apply(this, arguments);

  },
  get: {
    params: [],
    middleware: [],
    index: {
      handler: function(req, res) {
        res.render('event/index');

      }
    }

  }

});

module.exports = eventController;