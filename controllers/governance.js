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
    },
    cmarc: {
      handler: function(req, res) {
        //render view
        res.render('governance/cmarc')
      }
    },
    esca: {
      handler: function(req, res) {
        //render view
        res.render('governance/esca')
      }
    },
    ncr: {
      handler: function(req, res) {
        //render view
        res.render('governance/ncr')
      }
    },
    siec: {
      handler: function(req, res) {
        //render view
        res.render('governance/siec')
      }
    },
    smiec: {
      handler: function(req, res) {
        //render view
        res.render('governance/smiec')
      }
    }
  }
  //,
  //middlewares: []


});

module.exports = governanceController;
