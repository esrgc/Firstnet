/*
Author: Tu Hoang
ESRGC 2015

Event controller class 

*/

var lib = require('easynodemvc');
var Class = lib.Class;
var BaseController = lib.BaseController;
var TYPES = require('tedious').TYPES;

var thisController; //local controller scope
var eventController = Class.define({
  extend: BaseController,
  name: 'event',
  _className: 'EventController',
  initialize: function() {
    this.extend.prototype.initialize.apply(this, arguments);
    thisController = this;
    console.log(this.router);
  },
  get: {

    index: {
      params: [],
      middleware: [],
      handler: function(req, res) {
        res.render('event/index');
      }
    },
    events: {
      params: [
        {
          name: 'month',
          callback: function(req, res, next, value) {
            if (typeof value == 'undefined')
              req.month = null;
            else
              req.month = value;
            next();
          }
        },
        {
          name: 'year',
          callback: function(req, res, next, value) {
            if (typeof value == 'undefined')
              req.year = null;
            else
              req.year = value;
            next();
          }
        }
      ],
      handler: function(req, res) {
        var month = req.month;
        var year = req.year;
        var repo = thisController.getRepo();
        if (typeof repo == 'undefined') {
          throw new Error('Data repository is undefined');
        }
        repo.executeProcedure('getEvents', [
          {
            name: 'month',
            type: TYPES.Int,
            value: month
          },
          {
            name: 'year',
            type: TYPES.Int,
            value: year
          }
        ], function(data, dataDictionary) {
          res.json(data);
        });
      }
    }
  }

});

module.exports = eventController;