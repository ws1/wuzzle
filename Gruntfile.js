/*!
 * Wuzzle gruntfile (http://git.io/wuzzle)
 * Licensed under the MIT License.
 */

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
        src: '<%= wuzzle.less %>',
        dest: '<%= wuzzle.css %>'
      },
      distMin: {
        options: {
          cleancss: true,
          report: 'min'
        },
        src: '<%= wuzzle.css %>',
        dest: '<%= wuzzle.cssMin %>'
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 9', 'android 2.3', 'opera 12']
      },
      dist: {
        src: '<%= wuzzle.css %>',
        dest: '<%= wuzzle.css %>'
      },
    },

    csscomb: {
      dist: {
        options: {
          config: '.csscomb.json'
        },
        src: '<%= wuzzle.css %>',
        dest: '<%= wuzzle.css %>'
      }
    },

    usebanner: {
      dist: {
        options: {
          banner: '<%= banner %>'
        },
        src: [
          '<%= wuzzle.css %>',
          '<%= wuzzle.cssMin %>'
        ]
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
