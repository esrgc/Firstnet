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
    }
  });
};