﻿

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
    for (var i = 0; i < 9; i++) { //weeks
      bodyHtml += '<tr>';
      for (var j = 0; j < 7; j++) {//days in week
        if (day <= monthLength && (j >= startingDay || i > 0)) {
          //fill day in and assign id to that date (for example march 21st id is "3-21")
          if (day == todayDate.getDate())
            bodyHtml += '<td class="today" id="' + (this.month + 1) + '-' + day + '">' + day + '<div class="day-event"></div></td>';
          else
            bodyHtml += '<td id="' + (this.month + 1) + '-' + day + '">' + day + '<div class="day-event"></div></td>';
          day++;
        }
        else
          bodyHtml += '<td></td>';
      }
      bodyHtml += '</tr>';
      if (day > monthLength)
        break;
    }
    var html = [
      '<h4>',
        monthLabels[todayDate.getMonth()] + ', ' + todayDate.getFullYear(),
      '</h4>',
      '<table class="calendar-table table  table-bordered table-striped">',
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
  }

});