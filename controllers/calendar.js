﻿/*
Author: Tu Hoang
ESRGC 2015

Event controller class 

*/

var lib = require('easynodemvc');
var Class = lib.Class;
var BaseController = lib.BaseController;
var TYPES = require('tedious').TYPES;
var validator = require('validator');

var thisController; //local controller scope
var eventController = Class.define({
  extend: BaseController,
  name: 'calendar',
  _className: 'EventController',
  initialize: function() {
    this.extend.prototype.initialize.apply(this, arguments);
    thisController = this;
    //console.log(this.router);
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
          //console.log(data)
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
          var e = data[0];
          if (typeof e == 'undefined')
            res.redirect('index');
          //e.date = new Date(e.Start).toLocaleDateString();
          //e.startTime = new Date(e.Start).toLocaleTimeString();
          //e.endTime = new Date(e.End).toLocaleTimeString();
          res.render('calendar/detail', { data: e });
        });
      }
    },
    create: {
      handler: function(req, res) {
        res.render('calendar/create');
      }
    },
    update: {
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
          var e = data[0];
          if (typeof e == 'undefined')
            res.redirect('index');
          //e.date = new Date(e.Start).toLocaleDateString();
          //e.startTime = new Date(e.Start).toLocaleTimeString();
          //e.endTime = new Date(e.End).toLocaleTimeString();
          res.render('calendar/update', { data: e });
        });
       
      }
    },
    'delete': {
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
          var e = data[0];
          if (typeof e == 'undefined')
            res.redirect('index');
          //e.date = new Date(e.Start).toLocaleDateString();
          //e.startTime = new Date(e.Start).toLocaleTimeString();
          //e.endTime = new Date(e.End).toLocaleTimeString();
          res.render('calendar/delete', { data: e });
        });
      }
    }
  },
  post: {
    create: {
      handler: function(req, res) {
        console.log('Create new event. Inserting data...')
        var data = req.body;
        console.log(data);

        //validate start and end time


        var columns = [], values = [];

        for (var i in data) {
          var p = data[i];//take value
          columns.push('[' + i + ']');
          p = p.replace("'", "''")
          values.push('\'' + p + '\'');
        }

        var query = [
          'Insert into [Event] (' + columns.join(',') + ')\n',
          'Values (' + values.join(',') + ')'
        ].join('');


        console.log(query);

        var repo = thisController.getRepo();
        repo.executeQuery(query, [], function(data, dataDict) {
          res.redirect('index');
        });
      }
    },
    update: {
     handler: function(req, res) {
        console.log('Updating event....')
        var data = req.body;
        //console.log(data);

        var columns = [];
        var id = data.EventID;
        for (var i in data) {
          if (i == 'EventID')//skip eventID
            continue;
          var p = data[i];//take value
          if (typeof p == 'string')
            columns.push('[' + i + '] = \'' + p + '\'');
          else
            columns.push('[' + i + '] = ' + p);
        }

        var query = [
          'UPDATE [Event]\n',
          'SET ',
          columns.join(','),
          '\nWHERE [EventID] = ' + id
        ].join('');


        //console.log(query);

        var repo = thisController.getRepo();
        repo.executeQuery(query, [], function(data, dataDict) {
          console.log('Success!');
          res.redirect('event?id=' + id);
        });
        //res.redirect('event?id=' + data.EventID);
      }
    },
    'delete': {
     
      handler: function(req, res) {
        console.log('Updating event....')
        var data = req.body;
        var id = data.EventID;

        var query = [
           'DELETE [Event]\n',
           'WHERE [EventID] = ' + id
        ].join('');

        console.log(query);

        var repo = thisController.getRepo();
        repo.executeQuery(query, [], function(data, dataDict) {
          res.redirect('index');
        });
      }
    }
  }
  

});

module.exports = eventController;