module.exports = function (grunt) {
  'use strict';

  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  // Configuration
  grunt.initConfig({
    // Metadata
    pkg: grunt.file.readJSON('package.json'),

    // Paths
    wuzzle: {
      less: 'src/wuzzle.less',
      css: 'dist/wuzzle.css',
      cssMin: 'dist/wuzzle.min.css',
      banner: '/*! Wuzzle <%= pkg.version %> | <%= pkg.license %> License | http//git.io/wuzzle */\n'
    },

    // Tasks configuration
    clean: {
      dist: ['dist']
    },

    less: {
      dist: {
        files: {
          '<%= wuzzle.css %>': '<%= wuzzle.less %>'
        }
      },
      distMin: {
        options: {
          cleancss: true,
          report: 'min'
        },
        files: {
          '<%= wuzzle.cssMin %>': '<%= wuzzle.css %>'
        }
      }
    },

    csscomb: {
      sort: {
        options: {
          sortOrder: '.csscomb.json'
        },
        files: {
          '<%= wuzzle.css %>': ['<%= wuzzle.css %>']
        }
      }
    },

    usebanner: {
      dist: {
        options: {
          position: 'top',
          banner: '<%= wuzzle.banner %>'
        },
        files: {
          src: [
            '<%= wuzzle.css %>',
            '<%= wuzzle.cssMin %>'
          ]
        }
      }
    },

    watch: {
      less: {
        files: 'src/*.less',
        tasks: ['less', 'csscomb', 'usebanner']
      }
    }
  });

  // Load plugins
  require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});

  // Default task
  grunt.registerTask('default', ['clean', 'less', 'csscomb', 'usebanner']);
};