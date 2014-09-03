module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    //bump: {
    //  options: {
    //    files: ['package.json'],
    //    updateConfigs: ['pkg'],
    //    commit: false,
    //    createTag: false,
    //    push: false
    //  }
    //},
    less: {
      options: {
        compress: true
      },
      dist: {
        files: {
          'public/css/<%= pkg.name %>.css': ['public/css/style.less']
        }
      }
    },
    concat: {
      options: {
        //separator: ';',
      },
      //all: {
      //  src: [
      //    'public/js/*.js',
      //    'public/js/util/*.js',
      //    'public/js/view/*.js',
      //    'public/js/model/*.js',
      //    'public/js/collection/*.js',
      //    'public/js/router/*.js',
      //    'public/js/okdashboard/*.js',
      //    'public/js/okdashboard/**/*.js',
      //    'public/js/okdashboard/**/**/*.js'
      //  ],
      //  dest: 'public/js/dist/<%= pkg.name %>-all.js'
      //},
      multi: {
        files: {
          //'public/js/dist/<%= pkg.name %>-home.js': [
          //  'public/js/*.js',
          //  'public/js/util/*.js',
          //  'public/js/map/mapViewer.js',
          //  'public/js/map/leafletViewer.js',
          //  'public/js/geoDashTable/*.js',
          //  'public/js/view/*.js',
          //  'public/js/model/*.js',
          //  'public/js/collection/*.js',
          //  'public/js/router/*.js',
          //  'public/js/okdashboard/*.js',
          //  'public/js/okdashboard/home/*.js',
          //  'public/js/okdashboard/home/**/*.js'
          //],
          //'public/js/dist/<%= pkg.name %>-work.js': [
          //  'public/js/*.js',
          //  'public/js/util/*.js',
          //  'public/js/map/mapViewer.js',
          //  'public/js/map/leafletViewer.js',
          //  'public/js/geoDashTable/*.js',
          //  'public/js/view/*.js',
          //  'public/js/model/*.js',
          //  'public/js/collection/*.js',
          //  'public/js/router/*.js',
          //  'public/js/okdashboard/*.js',
          //  'public/js/okdashboard/work/model/*.js',
          //  'public/js/okdashboard/work/collection/*.js',
          //  'public/js/okdashboard/work/router/*.js',
          //  'public/js/okdashboard/work/view/*.js',
          //  'public/js/okdashboard/work/*.js',
          //  'public/js/okdashboard/work/*.js'

          //],
          //'public/js/dist/<%= pkg.name %>-workforce.js': [
          //  'public/js/*.js',
          //  'public/js/util/*.js',
          //  'public/js/map/mapViewer.js',
          //  'public/js/map/leafletViewer.js',
          //  'public/js/geoDashTable/*.js',
          //  'public/js/view/*.js',
          //  'public/js/model/*.js',
          //  'public/js/collection/*.js',
          //  'public/js/router/*.js',
          //  'public/js/okdashboard/*.js',
          //  'public/js/okdashboard/workforce/model/*.js',
          //  'public/js/okdashboard/workforce/collection/*.js',
          //  'public/js/okdashboard/workforce/router/*.js',
          //  'public/js/okdashboard/workforce/view/*.js',
          //  'public/js/okdashboard/workforce/*.js',
          //  'public/js/okdashboard/workforce/*.js'
          //],
          //'public/js/dist/<%= pkg.name %>-unemployment.js': [
          //  'public/js/*.js',
          //  'public/js/util/*.js',
          //  'public/js/map/mapViewer.js',
          //  'public/js/map/leafletViewer.js',
          //  'public/js/geoDashTable/*.js',
          //  'public/js/view/*.js',
          //  'public/js/model/*.js',
          //  'public/js/collection/*.js',
          //  'public/js/router/*.js',
          //  'public/js/okdashboard/*.js',
          //  'public/js/okdashboard/unemployment/model/*.js',
          //  'public/js/okdashboard/unemployment/collection/*.js',
          //  'public/js/okdashboard/unemployment/router/*.js',
          //  'public/js/okdashboard/unemployment/view/*.js',
          //  'public/js/okdashboard/unemployment/*.js'
          //],
          //'public/js/dist/<%= pkg.name %>-compare.js': [
          //  'public/js/*.js',
          //  'public/js/util/*.js',
          //  'public/js/map/mapViewer.js',
          //  'public/js/map/leafletViewer.js',
          //  'public/js/geoDashTable/*.js',
          //  'public/js/view/*.js',
          //  'public/js/model/*.js',
          //  'public/js/collection/*.js',
          //  'public/js/router/*.js',
          //  'public/js/okdashboard/*.js',
          //  'public/js/okdashboard/compare/*.js',
          //  'public/js/okdashboard/compare/model/*.js',
          //  'public/js/okdashboard/compare/collection/*.js',
          //  'public/js/okdashboard/compare/router/*.js',
          //  'public/js/okdashboard/compare/view/*.js',
          //  'public/js/okdashboard/compare/*.js'
          //],
          //'public/js/dist/<%= pkg.name %>-training.js': [
          //  'public/js/*.js',
          //  'public/js/util/*.js',
          //  'public/js/map/mapViewer.js',
          //  'public/js/map/leafletViewer.js',
          //  'public/js/geoDashTable/*.js',
          //  'public/js/view/*.js',
          //  'public/js/model/*.js',
          //  'public/js/collection/*.js',
          //  'public/js/router/*.js',
          //  'public/js/okdashboard/*.js',
          //  'public/js/okdashboard/training/model/*.js',
          //  'public/js/okdashboard/training/collection/*.js',
          //  'public/js/okdashboard/training/router/*.js',
          //  'public/js/okdashboard/training/view/*.js',
          //  'public/js/okdashboard/training/*.js',
          //  'public/js/okdashboard/training/*.js'

          //]
        }
      }
    },
    //browserify: {
    //  options: {
    //    bundleOptions: { debug: true }
    //  },
    //  dev: {
    //    src: 'public/js/index.js',
    //    dest: 'public/js/dist/<%= pkg.name %>.js'
    //  },
    //  deploy: {
    //    options: {
    //      bundleOptions: { debug: false }
    //    },
    //    src: 'public/js/index.js',
    //    dest: 'public/js/dist/<%= pkg.name %>.min.js'
    //  }
    //},
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
          'public/js/*.js',
          //'public/js/util/*.js',
          //'public/js/view/*.js',
          //'public/js/map/mapViewer.js',
          //'public/js/map/leafletViewer.js',
          //'public/js/geoDashTable/*.js',
          //'public/js/model/*.js',
          //'public/js/collection/*.js',
          //'public/js/router/*.js',
          //'public/js/okdashboard/*.js',
          //'public/js/okdashboard/**/*.js',
          //'public/js/okdashboard/**/**/*.js'
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