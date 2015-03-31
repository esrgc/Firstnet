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
          console.log(model.url());

          dayCell.find('.day-event').append(html);
        });

      }
    });
  }
});