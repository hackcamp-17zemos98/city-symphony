module.exports = function(grunt) {
    "use strict";

    // Project configuration.
    grunt.initConfig({
        clean: ['static/dist'],
        copy: {
            img: {
                expand: true,
                cwd: 'static/src/img/',
                src: ['**'],
                dest: 'static/dist/img/'
            },
            audio: {
                expand: true,
                cwd: 'static/src/audio/',
                src: ['**'],
                dest: 'static/dist/audio/'
            }
        },
        sync: {
            js: {
                files: [{
                    cwd: 'static/src/js/',
                    src: [
                        '**',
                        '!main.js'
                    ],
                    dest: 'static/dist/js/'
                }]
            },
            img: {
                files: [{
                    cwd: 'static/src/img/',
                    src: '**',
                    dest: 'static/dist/img/'
                }]
            },
            audio: {
                files: [{
                    cwd: 'static/src/audio/',
                    src: '**',
                    dest: 'static/dist/audio/'
                }]
            },
            vendor: {
                files: [{
                    cwd: 'static/src/vendor/',
                    src: '**',
                    dest: 'static/dist/vendor/'
                }]
            },
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed',
                    sourcemap: 'auto'
                },
                files: {
                    'static/dist/css/style.css': 'static/src/scss/style.scss'
                }
            }
        },
        express: {
            dev: {
                options: {
                    script: './server.js'

                }
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: './static/src/js/',
                    mainConfigFile: './static/src/js/main.js',
                    dir: './static/dist/js/',
                    removeCombined: true,
                    modules: [{
                        name: 'main',
                        include: ['../../src/vendor/requirejs/require.js']
                    }]
                }
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['static/src/vendor/requirejs/require.js', 'static/src/js/main.js'],
                dest: 'static/dist/js/main.js'
            }
        },
        jshint: {
            app: {
                src: ['**/*.js', '!**/node_modules/**', '!**/vendor/**', '!**/dist/**']
            }
        },
        watch: {
            express: {
                files: ['<%= jshint.app.src %>', '**/*.hbs', '!Gruntfile.js', '!**/static/**', 'data/**.json'],
                tasks: ['express:dev'],
                options: {
                    spawn: false
                }
            },
            code: {
                files: ['<%= jshint.app.src %>'],
                tasks: ['jshint:app']
            },
            css: {
                files: [
                    'static/src/scss/**/*.scss'
                ],
                tasks: ['sass']
            },
            js: {
                files: [
                    'static/src/**/*.js'
                ],
                tasks: ['sync', 'concat']
            }
        },
        notify_hooks: {
            options: {
              enabled: true,
              max_jshint_notifications: 5,
              title: "City Symphony",
              success: true,
              duration: 3
            }
          }
    });



    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-sync');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.task.run('notify_hooks');

    grunt.registerTask('dev', ['jshint', 'clean', 'sass', 'sync', 'concat', 'express', 'watch']);
    grunt.registerTask('default', ['jshint', 'clean', 'sass', 'copy', 'requirejs']);

};