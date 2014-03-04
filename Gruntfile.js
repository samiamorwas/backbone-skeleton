module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        ignores: ['build/*', 'public/*']
      },
      all: ['Gruntfile.js', 'src/**/*.js']
    },

    concat: {
      dist: {
        src: ['src/**/*.js'],
        dest: 'build/<%= pkg.name %>.js'
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'build/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },

    copy: {
      main: {
        src: 'build/<%= pkg.name %>.min.js',
        dest: 'public/<%= pkg.name %>.min.js'
      },
      index: {
        src: 'src/index.html',
        dest: 'public/index.html'
      }
    },

    watch: {
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: ['jshint']
      },
      js: {
        files: 'src/**/*.js',
        tasks: ['jshint', 'concat', 'uglify', 'copy:main']
      },
      index: {
        files: 'src/index.html',
        tasks: ['copy:index']
      }
    },

    clean: ['build']
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'copy']);

};