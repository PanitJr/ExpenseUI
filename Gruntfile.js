module.exports = function(grunt) {

  grunt.initConfig({

    concat: {
      basesass: {
       src: [
          'node_modules/angular-material/angular-material.scss',
          'node_modules/angular-material-data-table/dist/md-data-table.css'
       ],
       dest: 'sass/build/basebuild.scss',
      },
      sass: {
       src: [
          'sass/*.scss',
       ],
       dest: 'sass/build/build.scss',
      }
    },

    watch: {
      appjs : {
        tasks: ['uglify:app'],
        files: [
          'script/*/*.js',
          'script/Object/*/*.js',
          'script/Directive/*/*.js',
        ],
      },

      default: {
        files: [
          'sass/*.scss',
          'script/*/*.js',
          'script/Object/*/*.js',
          'script/Directive/*/*.js',
        ],
        tasks: ['default'],
        options: {
          interrupt: true,
        },
      },
    },

    uglify: {
      base: {
        files: {
          'app/assets/loads/base.min.js': [
            'node_modules/jquery/dist/jquery.js',
            'bower_components/jquery-ui/jquery-ui.js',
            'node_modules/angular/angular.js',
            'node_modules/angular-animate/angular-animate.js',
            'node_modules/angular-aria/angular-aria.js',
            'node_modules/angular-material/angular-material.js',
            'node_modules/angular-route/angular-route.js',
            'node_modules/angular-cookies/angular-cookies.js',
            'node_modules/angular-material-data-table/dist/md-data-table.js',
            'node_modules/angular-ui-sortable/dist/sortable.js',
            'node_modules/moment/moment.js',
            'node_modules/angular-loading-bar/build/loading-bar.js'
          ]
        }
      },
      app:{
        files:{
          'app/assets/loads/app.min.js':[
            'script/Module/*.js',
            'script/Controller/*.js',
            'script/Service/*.js',
            'script/Object/*/*.js',
            'script/Directive/*/*.js',
          ]
        }
      }
    },

    sass: {  
      base:{
        files:{
          'app/assets/loads/base.css':'sass/build/basebuild.scss',
        }
      },                           
      dist: {  
        files: {                     
          'app/assets/loads/style.css':'sass/build/build.scss',     
        }
      }
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      basecss: {
        files: {
          'app/assets/loads/base.min.css': ['app/assets/loads/base.css','node_modules/angular-loading-bar/build/loading-bar.css']
        }
      },
      css: {
        files: {
          'app/assets/loads/style.min.css': ['app/assets/loads/style.css']
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('install', ['concat','sass','cssmin','uglify']);
  grunt.registerTask('basecss', ['concat:basesass','sass:base','cssmin:basecss']);
  grunt.registerTask('basejs', ['uglify:base']);
  grunt.registerTask('default', ['concat:sass','sass:dist','cssmin:css','uglify:app']);
  grunt.registerTask('live', ['watch:default']);
  grunt.registerTask('livejs', ['watch:appjs']);

};