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