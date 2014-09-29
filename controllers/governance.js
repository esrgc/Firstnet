/*
Author: Tu Hoang
ESRGC 2014

governance controller class 

provides governance action methods
requires base controller (base.js)
*/
var Class = require('../lib').Class;
var BaseController = require('../lib').BaseController;

var governanceController = Class.define({
  extend: BaseController,
  _className: 'GovernanceController',
  //mountPath: '', //this is optional for route area, custom route...ect
  name: 'governance',
  initialize: function() {
    this.extend.prototype.initialize.apply(this, arguments);
    //console.log(this.router);

  },
  get: {
    //action
    index: {
      handler: function(req, res) {
        //render view
        res.render('governance/index');
      }
    },
    wagin: {
      handler: function(req, res) {
        //render view
        res.render('governance/wagin')
      }

    }
  }
  //,
  //middlewares: []


});

module.exports = governanceController;
