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
    name: 'Event Calendar',
    views: [

    ],
    collections: [

    ],
    routers: [
      'Main'
    ],
    launch: function() {
      //custom code on app launch event

      //for underscore template custom dilimiters
      //_.templateSettings = {
      //  evaluate: /\{\[([\s\S]+?)\]\}/g,
      //  interpolate: /\{\{([\s\S]+?)\}\}/g
      //};
      ////force ajax calls not to cache requests
      //$.ajaxSetup({ cache: false });
      console.log('Launch function run.');
    }
  });
};
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
  }

});