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
  name: 'calendar',
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
        res.render('calendar/index');
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
    },
    event: {
      //params: [
      //  {
      //    name: 'id',
      //    callback: function(req, res, next, value) {
      //      if (typeof value == 'undefined')
      //        req.id = null;
      //      else
      //        req.id = value;
      //      next();
      //    }
      //  }
      //],
      handler: function(req, res) {
        var id = req.query.id;
        if (typeof id == 'undefined') {
          res.redirect('index');
        }
        //retrieve event from database
        var repo = thisController.getRepo();
        repo.executeProcedure('getEvent', [
          {
            name: 'id',
            type: TYPES.Int,
            value: id
          }
        ], function(data, dataDictionary) {
          //console.log(data);
          var event = data[0];
          if (typeof event == 'undefined')
            res.redirect('index');
          event.date = new Date(event.Start).toLocaleDateString();
          event.startTime = new Date(event.Start).toLocaleTimeString();
          event.endTime = new Date(event.End).toLocaleTimeString();
          res.render('calendar/detail', { data: event });
        });
      }
    },
    create: {
      handler: function(req, res) {
        res.render('calendar/create');
      }
    },
    edit: {
      handler: function(req, res) {
        res.render('calendar/edit');
      }
    },
    'delete': {
      handler: function(req, res) {
        res.render('calendar/delete');
      }
    }
  },
  post: {
    event: {      
      handler: function(req, res) {

      }
    }
  },
  put: {
    event: {
      handler: function(req, res) {

      }
    }
  },
  'delete': {
    event: {
      handler: function(req, res) {

      }
    }
  }

});

module.exports = eventController;