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

    csslint: {
      dist: {
        options: {
          csslintrc: '.csslintrc'
        },
        src: '<%= wuzzle.css %>'
      }
    },

    watch: {
      src: {
        files: 'src/*.less',
        tasks: ['less', 'csscomb', 'usebanner']
      },
      test: {
        files: '<%= wuzzle.css %>',
        tasks: 'csslint'
      }
    }
  });

  // Load plugins
  require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});

  // Distribution task
  grunt.registerTask('dist', ['clean', 'less', 'csscomb', 'usebanner']);

  // Test task
  grunt.registerTask('test', 'csslint');

  // Default task
  grunt.registerTask('default', ['dist', 'test']);
};