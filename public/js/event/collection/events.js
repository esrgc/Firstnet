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