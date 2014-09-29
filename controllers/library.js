/*
Author: Tu Hoang
ESRGC 2014

library controller class 

provides library action methods
requires base controller (base.js)
*/
var Class = require('../lib').Class;
var BaseController = require('../lib').BaseController;

var libraryController = Class.define({
  extend: BaseController,
  _className: 'LibraryController',
  //mountPath: '', //this is optional for route area, custom route...ect
  name: 'library',
  initialize: function() {
    this.extend.prototype.initialize.apply(this, arguments);
    //console.log(this.router);

  },
  get: {
    //action
    index: {
      handler: function(req, res) {
        //render view
        res.render('library/index');
      }
    }
  }
  //,
  //middlewares: []


});

module.exports = libraryController;
