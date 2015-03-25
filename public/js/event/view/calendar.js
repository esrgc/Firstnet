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
  },
  nextMonth: function() {
    this.calendar.incrementMonth();
    console.log(this.calendar.month);
    this.render();//re-render calendar
    return false;
  },
  prevMonth: function() {
    this.calendar.decrementMonth();
    console.log(this.calendar.month);
    this.render();//re-render calendar
    return false;
  }
});