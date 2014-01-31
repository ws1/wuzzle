module.exports = function (grunt) {
  'use strict';

  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  // Configuration
  grunt.initConfig({
    // Meta data
    pkg: grunt.file.readJSON('package.json'),

    wuzzle: {
      less: 'src/wuzzle.less',
      css: 'dist/wuzzle.css',
      cssMin: 'dist/wuzzle.min.css'
    },

    banner: '/*!\n' +
            ' * Wuzzle <%= pkg.version %> (http//git.io/wuzzle)\n' +
            ' * Licensed under the <%= pkg.license %> License.\n' +
            ' */\n',

    // Tasks
    clean: {
      dist: 'dist'
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
      dist: {
        options: {
          config: '.csscomb.json'
        },
        files: {
          '<%= wuzzle.css %>': '<%= wuzzle.css %>'
        }
      }
    },

    usebanner: {
      dist: {
        options: {
          position: 'top',
          banner: '<%= banner %>'
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
      src: {
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