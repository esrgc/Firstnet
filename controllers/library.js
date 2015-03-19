/*
Author: Tu Hoang
ESRGC 2014

library controller class 

provides library action methods
requires base controller (base.js)
*/
var Class = require('easynodemvc').Class;
var BaseController = require('easynodemvc').BaseController;
var fs = require('fs');

var libraryController = Class.define({
  extend: BaseController,
  _className: 'LibraryController',
  //mountPath: '', //this is optional for route area, custom route...ect
  name: 'library',
  initialize: function() {
    this.extend.prototype.initialize.apply(this, arguments);
    //console.log(this.router);
  },
  get: {
    //action
    index: {
      handler: function(req, res) {
        var library = {};
        var dirPath = 'public/documents';
        //console.log(dirPath);
        var dirs = fs.readdirSync(dirPath);//read sub-folders in "documents folder 
        //loop through folders and read documents
        for (var i in dirs) {
          var dir = dirPath + '/' + dirs[i];
          var dirName = dirs[i];
          var urlPath = '../documents/' + dirName;
          //console.log(dir);
          if (fs.statSync(dir).isDirectory()) {
            
            var files = fs.readdirSync(dir);
            library[dirName] = [];
            for (x in files) {
              library[dirName].push({
                name: files[x],
                url: urlPath + '/' + files[x]
              });
            }
          }
        }
        console.log(library);
        //render view
        res.render('library/index', { model: library });
      }
    }
  }
  //,
  //middlewares: []


});

module.exports = libraryController;
