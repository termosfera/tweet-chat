var grunt = require("grunt");

module.exports = function(grunt) {
    "use strict";

    grunt.initConfig({
        watch: {
            files: [
                'public/styles/less/*.less',
                'public/index.html'
            ],
            tasks: ['less']
        },
        less: {
            dev: {
                options: {
                    paths: ["styles"]
                },
                files: {
                    "public/styles/css/main.css": "public/styles/less/main.less"
                }
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        'public/styles/css/*.css',
                        'public/index.html'
                    ]
                },
                options: {
                    watchTask: true,
                    server: "./public"
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-browser-sync');

    grunt.registerTask('build', [
        'less'
    ]);

    grunt.registerTask('dev', [
        'browserSync',
        'watch'
    ]);

};