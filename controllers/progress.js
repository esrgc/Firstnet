/*
Author: Christopher Webster
CHHS 2015

progress controller class 

provides why action methods
requires base controller (base.js)
*/
var Class = require('easynodemvc').Class;
var BaseController = require('easynodemvc').BaseController;

var aboutController = Class.define({
  extend: BaseController,
  _className: 'ProgressController',
  //mountPath: '', //this is optional for route area, custom route...ect
  name: 'progress',
  initialize: function() {
    this.extend.prototype.initialize.apply(this, arguments);
    //console.log(this.router);

  },
  get: {
    //action
    index: {
      handler: function(req, res) {
        //render view
        res.render('progress/index', {
          user: req.user
        });
      }
    }
  }
  //,
  //middlewares: []


});

module.exports = aboutController;
