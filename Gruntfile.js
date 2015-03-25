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
          'public/js/dist/<%= pkg.name %>-event.js': [
                'public/js/util/*.js',
                'public/js/event/*.js',
                'public/js/event/**/*.js'
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