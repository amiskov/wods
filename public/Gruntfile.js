module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        //------------------------------------------------------------

        less: {
            options: {
                expand: true
            },

            dev: {
                options: {
                    strictMath: true
                },
                files: {
                    'css/all.css': ['less/all.less'],
                    'css/ie.css': ['less/ie.less'],
                    'css/ie8.css': ['less/ie8.less'],
                    'css/print.css': ['less/print.less']
                }
            },
            release: {
                options: {
                    strictMath: true,
                    yuicompress: true
                },
                files: {
                    'css/all.css': ['less/all.less']
                }
            }
        },

        //------------------------------------------------------------

        watch: {
            less: {
                files: ['less/**'],
                tasks: ['less:dev'],
                options: {
                    interrupt: true
                }
            },
            livereload: {
                options: {
                    livereload: true
                },
                files: ['css/**', '/*.php', '**/*.html']
            }
        }
        //------------------------------------------------------------

    });

    // Load the plugin that provides the "less" task.
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', [
        'less:dev'
    ]);

};