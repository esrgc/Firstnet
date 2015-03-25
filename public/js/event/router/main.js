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