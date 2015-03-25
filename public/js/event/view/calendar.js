/*
Author: Tu Hoang
ESRGC 2015

Calendar view

*/

app.View.Calendar = Backbone.View.extend({
  name: 'EventsCalendar',
  el: '#event-calendar',
  id: '#event-calendar',
  intialize: function() {
    
  },
  render: function(viewData) {
    var template = _.template($('#calendar-tpl').html());
    
    this.$el.html(template);
  }



});