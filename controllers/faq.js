/*
Author: Tu Hoang
ESRGC 2014

faq controller class 

provides faq action methods
requires base controller (base.js)
*/
var Class = require('../lib').Class;
var BaseController = require('../lib').BaseController;

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
        res.render('faq/index');
      }
    }
    
  }
  //,
  //middlewares: []


});

module.exports = faqController;
