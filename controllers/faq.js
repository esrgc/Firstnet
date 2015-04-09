/*
Author: Tu Hoang
ESRGC 2014

faq controller class 

provides faq action methods
requires base controller (base.js)
*/
var Class = require('easynodemvc').Class;
var BaseController = require('easynodemvc').BaseController;

var faqController = Class.define({
  extend: BaseController,
  _className: 'FaqController',
  //mountPath: '', //this is optional for route area, custom route...ect
  name: 'faq',
  initialize: function() {
    this.extend.prototype.initialize.apply(this, arguments);
    //console.log(this.router);

  },
  get: {
    //action
    index: {
      handler: function(req, res) {
        //render view
        res.render('faq/index', { user: req.user });
      }
    }
    
  }
  //,
  //middlewares: []


});

module.exports = faqController;
