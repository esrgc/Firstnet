/*
Grunt file 

*/



module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),    
    less: {
      options: {
        compress: true
      },
      dist: {
        files: {
          'public/css/<%= pkg.name %>.css': ['public/css/styles.less']
        }
      }
    },
    concat: {
      options: {
        //separator: ';',
      },
     
      multi: {
        files: {
          'public/js/dist/<%= pkg.name %>-index.js': [
                'public/js/util/*.js',
                'public/js/event/index.js',
                'public/js/event/model/*.js',
                'public/js/event/collection/*.js',
                'public/js/event/router/*.js',
                'public/js/event/view/*.js'
          ],
          'public/js/dist/<%= pkg.name %>-create-event.js': [
                'public/js/util/*.js',
                'public/js/event/create.js',
                'public/js/event/model/*.js',
                'public/js/event/collection/*.js',
                'public/js/event/router/*.js',
                'public/js/event/view/*.js'
          ],
          'public/js/dist/<%= pkg.name %>-update-event.js': [
                'public/js/util/*.js',
                'public/js/event/update.js',
                'public/js/event/model/*.js',
                'public/js/event/collection/*.js',
                'public/js/event/router/*.js',
                'public/js/event/view/*.js'
          ],
          'public/js/dist/<%= pkg.name %>-delete-event.js': [
                'public/js/util/*.js',
                'public/js/event/delete.js',
                'public/js/event/model/*.js',
                'public/js/event/collection/*.js',
                'public/js/event/router/*.js',
                'public/js/event/view/*.js'
          ]
        }
      }
    },
   
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'public/js/dist/<%= pkg.name %>*.js',
        dest: 'public/js/dist/<%= pkg.name %>.min.js'
      }
    },
    watch: {
      js: {
        files: [
          'public/js/util/*.js',
          'public/js/event/*.js',
          'public/js/event/**/*.js'
        ],
        tasks: ['concat']
      },
      //browserify: {
      //  files: ['public/js/*.js'],
      //  tasks: ['bump', 'browserify:dev']
      //},
      css: {
        files: 'public/css/*.less',
        tasks: ['less']
      }
    }
  });

  //grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  //grunt.registerTask('default', ['bump', 'cssmin', 'concat', 'uglify']);
  //grunt.registerTask('default', ['bump', 'less', 'browserify:dev', 'watch']);
  grunt.registerTask('deploy', ['less', 'concat', 'uglify']);
  grunt.registerTask('default', ['less', 'concat', 'watch']);

};