/*
Tu Hoang
ESRGC
2014

class.js
utility functions that implements OOP
*/

/*
function that defines a new class by passing a new
prototype object (literal) as parameter. New classes
can extend/inherit from other classes by passing the 
inherit class name to extend property of the new class 
prototype object

Example:
var newClass = dx.define({
extend: OtherClass,
initialize: function(options){
};
});
*/
var define = function(child) {
  var ch = child;
  var p = ch.extend;
  var _class_ = null;
  if (p == null || typeof p == 'undefined') {
    _class_ = function() {
      if (typeof this.initialize != 'undefined')
        this.initialize.apply(this, arguments);
    };
    _class_.prototype = ch;
  }
  else {
    _class_ = function() {
      var init = typeof this.initialize == 'function' ? this.initialize : 'undefined';
      //run child initialize function if exists
      if (typeof init == 'function') {
        init.apply(this, arguments);
      }
    };
    extend(_class_, p); //inherit prototype
    copy(_class_.prototype, ch); //augment prototype
  }
  return _class_;
};
/*
Deep copy object prototype by new keyword.
This method creates a new prototype object, whose prototype 
is a copy of the parent's prototype, and assign it to the child prototype.
Finally, sets the child's prototype constructor to the child's constructor
*/
var extend = function(child, parent) {
  var F = function() { };
  F.prototype = parent.prototype;
  child.prototype = new F();
  child.prototype.constructor = child;
  child.parent = parent.prototype;
};
//copy object properties
var copy = function(dest, source) {
  dest = dest || {};
  if (source) {
    for (var property in source) {
      var value = source[property];
      if (value !== undefined) {
        dest[property] = value;
      }
    }
    /**
    * IE doesn't include the toString property when iterating over an object's
    * properties with the for(property in object) syntax.  Explicitly check if
    * the source has its own toString property.
    */
    /*
    * FF/Windows < 2.0.0.13 reports "Illegal operation on WrappedNative
    * prototype object" when calling hawOwnProperty if the source object
    * is an instance of window.Event.
    */

    var sourceIsEvt = typeof window.Event == "function"
                          && source instanceof window.Event;

    if (!sourceIsEvt &&
                source.hasOwnProperty && source.hasOwnProperty("toString")) {
      dest.toString = source.toString;
    }
  }
  return dest;
};


/**
 * @param {int} The month number, 0 based
 * @param {int} The year, not zero based, required to account for leap years
 * @return {Date[]} List with date objects for each day of the month
 */
var getDaysInMonth = function(month, year) {
  var date = new Date(year, month, 1);
  var days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
};

//get days in months
var todayDate = new Date();
var daysOfMonth = getDaysInMonth(todayDate.getMonth(), todayDate.getFullYear());
var dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var monthLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
Date.prototype.toShortTimeString = function() {
  var hours = this.getHours();
  var minutes = this.getMinutes();
  var ampm = hours > 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ampm;
  return strTime;
}
var Calendar = define({
  name: 'Calendar',
  _className: 'Calendar',
  initialize: function(month, year) {
    this.month = (isNaN(month) || month == null) ? todayDate.getMonth() : month;
    this.year = (isNaN(year) || year == null) ? todayDate.getFullYear() : year;
  },
  html: '',
  generateHtml: function() {
    var firstDay = new Date(this.year, this.month, 1);
    var startingDay = firstDay.getDay();
    var monthLength = daysInMonth[this.month];
    //compensate leap year (thanks to tutorial online and google code)
    if (this.month == 1) { // February only!
      if ((this.year % 4 == 0 && this.year % 100 != 0) || this.year % 400 == 0) {
        monthLength = 29;
      }
    }

    var monthName = monthLabels[this.month];

    var headerHtml = '', bodyHtml = '';

    //generate header (days)
    for (var i = 0; i < 7; i++) {
      headerHtml += '<th>' + dayLabels[i] + '</th>';
    }
    //generate body 
    var day = 1;
    var lastMonth = (this.month - 1) < 0 ? 11 : this.month - 1;//get previous month
    lastMonthDay = daysInMonth[lastMonth] ;//previous month day length is the last day of previous month
    nextMonthDay = 1;
    for (var i = 0; i < 9; i++) { //weeks
      bodyHtml += '<tr>';
      for (var j = 0; j < 7; j++) {//days in week
        if (day <= monthLength && (j >= startingDay || i > 0)) {
          //fill day in and assign id to that date (for example march 21st id is "3-21")
          if (day == todayDate.getDate() && todayDate.getMonth() == this.month && todayDate.getFullYear() == this.year)
            bodyHtml += '<td class="today" id="' + (this.month + 1) + '-' + day + '">' + day + '<div class="day-event"></div></td>';
          else
            bodyHtml += '<td id="' + (this.month + 1) + '-' + day + '">' + day + '<div class="day-event"></div></td>';
          day++;
        }
        else {
          if (j < startingDay && i == 0) {
            var ld = lastMonthDay - (startingDay - j -1) ;            
            bodyHtml += '<td class="gray-out">' + ld + '</td>';
          }
          else 
            bodyHtml += '<td class="gray-out">' + nextMonthDay++ + '</td>';
        }
      }
      bodyHtml += '</tr>';
      if (day > monthLength)
        break;
    }
    var html = [
      '<h4>',
        monthName + ', ' + this.year,
      '</h4>',
      '<table class="calendar-table table table-bordered">',
       '<thead>',
          '<tr>',
            headerHtml,
          '</tr>',
        '</thead>',
        '<tbody>',
            bodyHtml,
        '</tbody>',
      '</table>'
    ].join('');

    return html;
  },
  setMonth: function(month) {
    if (typeof month == 'undefined') return;//does nothing if undefined
    if (isNaN(month) || month == null) {
      console.log('Month must be a valid month number');
      return;
    }
    this.month = month;
  },
  incrementMonth: function() {
    this.month += 1;
    if (this.month > 11) {
      this.year++;
      this.month = 0;
    }
  },
  decrementMonth: function() {
    this.month -= 1;
    if (this.month < 0) {
      this.year--;
      this.month = 11;
    }
  },
  getMonth: function() {
    return this.month + 1;//month starts at 0
  },
  getYear: function() {
    return this.year;
  }

});
/*
Author: Tu hoang
ESRGC Mar 2015

Event calendar application 

backbone application
start up function
*/

var startup = app.startup = function() {
  console.log('Initilizing application...');

  //start application
  app.application({
    name: 'Create Event',
    views: [
    ],
    collections: [
    ],
    routers: [
    ],
    launch: function() {
      //custom code on app launch event    
      //for underscore template custom dilimiters like mustache
      _.templateSettings = {
        evaluate: /\{\[([\s\S]+?)\]\}/g,
        interpolate: /\{\{([\s\S]+?)\}\}/g
      };
      ////force ajax calls not to cache requests
      //$.ajaxSetup({ cache: false });
      console.log('Launch(): Application initilization completed. ');
    }
  });
};
/*
Author: Tu Hoang
ESRGC 2015

Model
event.js

Represent model metadata

dependency: backbone.js

*/

app.Model.Event = Backbone.Model.extend({
  name: 'Event',  
  idAttribute: 'EventID',
  urlRoot: 'event'
});
/*
Author: Tu Hoang
ESRGC 2015

Collection
events.js

dependency: backbone.js

*/

app.Collection.Events = Backbone.Collection.extend({
  name: 'Events',
  model: app.Model.Event,
  params: {
    month: (new Date()).getMonth() + 1,//month starts at 0 in javascript
    year: (new Date()).getFullYear()
  },
  url: function() {
    return [
      'events/',
      this.params.month,
      '/',
      this.params.year
    ].join('');
  },
  setMonth: function(month) {
    if (typeof month == 'undefined') {
      console.log('month must be specified');
      return;
    }
    if (isNaN(month) || month == null) {
      console.log('Month must be a valid numder')
      return;
    }
    this.params.month = month;
  },
  setYear: function(year) {
    if (typeof year == 'undefined') {
      console.log('year must be specified');
      return;
    }
    if (isNaN(year) || year == null) {
      console.log('year must be a valid numder')
      return;
    }
    this.params.year = year;
  }
});
/*
Author: Tu Hoang
ESRGC 2015
Router
main.js
provides routes for event calendar 
*/

app.Router.Main = Backbone.Router.extend({
  name: 'main',
  routes: {
    '': 'startup'

  },
  startup: function() {
    console.log('starting up route initiated...');
    var calendarView = app.getView('EventsCalendar');
    calendarView.render();
  }

});
/*
Author: Tu Hoang
ESRGC 2015

Calendar view

*/

app.View.Calendar = Backbone.View.extend({
  name: 'EventsCalendar',
  el: '#event-calendar',
  id: '#event-calendar',
  events: {
    'click a#prev-month': 'prevMonth',
    'click a#next-month': 'nextMonth'

  },
  initialize: function() {
    this.calendar = new Calendar();
  },
  render: function(viewData) {
    var calHtml = this.calendar.generateHtml();
    //get template
    var template = _.template($('#calendar-tpl').html());
    //insert compiled html to element
    this.$el.html(template({ html: calHtml, name: 'test' }));
    //load calendar events with specified month and year
    this.loadEvents(this.calendar.getMonth(), this.calendar.getYear());
  },
  nextMonth: function() {
    this.calendar.incrementMonth();
    //console.log(this.calendar.month);
    this.render();//re-render calendar
    return false;
  },
  prevMonth: function() {
    this.calendar.decrementMonth();
    //console.log(this.calendar.month);
    this.render();//re-render calendar
    return false;
  },
  loadEvents: function(month, year) {
    var scope = this;
    var eventCollection = app.getCollection('Events');

    if (typeof month != 'undefined')
      eventCollection.setMonth(month);
    if (typeof year != 'undefined')
      eventCollection.setYear(year);

    eventCollection.fetch({
      success: function(collection, res, options) {
        _.each(collection.models, function(model) {
          //parse day in event
          var startDate = new Date(model.get('Start'));
          var cellID = (startDate.getMonth() + 1) + '-' + (startDate.getDate());
          //locate day cell in calendar
          var dayCell = scope.$('.calendar-table td#' + cellID);
          
          var eventJson = model.toJSON();
          var eventTpl = _.template($('#calendar-event-tpl').html());
          var html = eventTpl(eventJson);
          //console.log(model.url());

          dayCell.find('.day-event').append(html);
        });

      }
    });
  }
});