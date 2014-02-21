module.exports = function (grunt) {
  'use strict';

  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  // Configuration
  grunt.initConfig({
    // Meta data
    pkg: grunt.file.readJSON('package.json'),

    // Paths
    wuzzle: {
      less: 'src/wuzzle.less',
      css: 'dist/wuzzle.css',
      cssMin: 'dist/wuzzle.min.css'
    },

    // Banner
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

    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 9', 'android 2.3', 'opera 12']
      },
      dist: {
        src: 'dist/wuzzle.css',
        dest: 'dist/wuzzle.css'
      },
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
  grunt.registerTask('default', [
    'clean',
    'less:dist',
    'autoprefixer',
    'less:distMin',
    'csscomb',
    'usebanner'
  ]);
};
