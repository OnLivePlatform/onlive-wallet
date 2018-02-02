module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    ngtemplates:  {
      multiSigWeb:        {
        src:      ['partials/**.html', 'partials/modals/**.html'],
        dest:     'partials.js'
      }
    },
    watch: {
      scripts: {
        files: ['partials/*.html', 'partials/modals/*.html'],
        tasks: ['ngtemplates'],
        options: {
          livereload: true,
        }
      }
    },
    eslint: {
     target: ['Gruntfile.js', 'controllers/**.js', 'services/**.js', '**.js']
   },
   'npm-command': {
      certs: {
        options: {
          args: ["certs"],
          cmd: "run"
        }
      }
    }
  });

  grunt.registerTask('ssl-cert', function () {
    if (!grunt.file.exists('./localhost.crt') && !grunt.file.exists('./localhost.key')) {      
      grunt.task.run(['npm-command']);
    }
  });

  // Load the plugin that provides the http server.
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-npm-command');

  grunt.registerTask('default', ['ngtemplates']);
};
