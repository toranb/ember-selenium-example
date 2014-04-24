module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-testem');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-es6-module-transpiler');
  grunt.loadNpmTasks('grunt-ember-template-compiler');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    watch: {
      options: {
        spawn: false,
        livereload: true
      },
      scripts: {
        files: ['js/templates/**/*.handlebars', 'js/app/**/*.js'],
        tasks: ["local"]
      },
    },
    testem: {
      options: {
        launch_in_dev : ['PhantomJS']
      },
      main: {
        src: ['testem.json']
      }
    },
    transpile: {
      tests: {
        type: 'amd',
        moduleName: function(path) {
            return grunt.config.process('js/tests/') + path;
        },
        files: [{
          expand: true,
          cwd: 'js/tests/',
          src: '**/*.js',
          dest: 'js/dist/transpiled/tests/'
        }]
      },
      app: {
        type: 'amd',
        moduleName: function(path) {
          return grunt.config.process('js/') + path;
        },
        files: [{
          expand: true,
          cwd: 'js/app/',
          src: '**/*.js',
          dest: 'js/dist/transpiled/app/'
        }]
      },
      bower: {
        type: 'amd',
        moduleName: function(path) {
          return grunt.config.process('bower/') + path;
        },
        files: [{
          expand: true,
          cwd: 'js/vendor/',
          src: '**/*.js',
          dest: 'js/dist/transpiled/bower/'
        }]
      }
    },
    concat: {
      dist: {
          src: [
            'js/lib/jquery.min.js',
            'js/lib/handlebars.js',
            'js/lib/ember.js',
            'js/lib/loader.js',
            'js/lib/ember-resolver.js',
            'js/dist/tmpl.min.js',
            'js/dist/transpiled/app/**/*.js',
            'js/dist/transpiled/bower/**/*.js'],
          dest: 'js/dist/deps.min.js'
      },
      test: {
          src: [
            'js/lib/jquery.min.js',
            'js/lib/handlebars.js',
            'js/lib/ember.js',
            'js/lib/jquery.mockjax.js',
            'js/lib/loader.js',
            'js/lib/ember-resolver.js',
            'js/dist/tmpl.min.js',
            'js/dist/transpiled/app/**/*.js',
            'js/dist/transpiled/bower/**/*.js',
            'js/dist/transpiled/tests/**/*.js',
            'js/lib/test-loader.js'],
          dest: 'js/dist/deps.min.js'
      }
    },
    emberhandlebars: {
        compile: {
            options: {
                templateName: function(sourceFile) {
                    var newSource = sourceFile.replace('js/templates/', '');
                    return newSource.replace('.handlebars', '');
                }
            },
            files: ['js/templates/*.handlebars'],
            dest: 'js/dist/tmpl.min.js'
        }
    },
    connect: {
      server: {
        options: {
          port: 3000,
          livereload: true,
          base: './'
        }
      }
    }
  });

  grunt.task.registerTask('local', ['transpile:app', 'transpile:bower', 'emberhandlebars', 'concat:dist']);
  grunt.task.registerTask('test', ['transpile:app', 'transpile:bower', 'transpile:tests', 'emberhandlebars', 'concat:test', 'testem:main']);
  grunt.task.registerTask("server", ['connect:server', 'local', 'watch']);
}
