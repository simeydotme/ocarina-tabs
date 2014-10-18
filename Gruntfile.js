   
       module.exports = function(grunt) {

        grunt.initConfig({

            pkg: grunt.file.readJSON("package.json"),

            banner: "/*\n" +
            " * <%= pkg.name %> | ♪♫ | <%= pkg.version %> | ♫♪ | <%= grunt.template.today(\"yyyy-mm-dd\") %>\n" +
            " * <%= pkg.homepage %>\n" +
            " * Licenced (<%= pkg.license %>) <%= grunt.template.today(\"yyyy\") %> | ♪ | <%= pkg.author %>;\n" +
            " */\n",

            clean: {

                dist: ["app/dist"]

            },

            concat: {

                options: {

                    banner: "<%= banner %>",
                    stripBanners: true

                },

                dist: {

                    src: ["app/src/js/app.js", "app/src/js/init.js", "app/src/js/modules/*.js"],
                    dest: "app/dist/js/<%= pkg.name %>.js"

                }

            },

            copy: {

                images: {

                    files: [{

                        expand: true, 
                        flatten: true,
                        src: ["app/src/img/*.{gif,jpg,png}"], 
                        dest: "app/dist/img/"

                    }]

                }

            },

            uglify: {

                options: {

                    banner: "<%= banner %>"

                },

                dist: {

                    src: "<%= concat.dist.dest %>",
                    dest: "app/dist/js/<%= pkg.name %>.min.js"

                }

            },

            jshint: {

                gruntfile: {

                    src: "Gruntfile.js"

                },

                app: {

                    src: ["app/**/*.js"]

                }

            },

            watch: {

                gruntfile: {

                    files: "<%= jshint.gruntfile.src %>",
                    tasks: ["jshint:gruntfile"]

                },

                js: {

                    files: ["app/**/*.js", "app/**/*.html"],
                    tasks: ["wiredep", "jshint", "copy"]

                },

                sass: {

                    files: ["app/**/*.scss"],
                    tasks: ["sass", "autoprefixer"]

                }

            },

            wiredep: {

                zoom: {

                    src: [ "app/**/*.html" ]

                }

            },

            sass: {

                app: {

                    options: {

                        style: "expanded",
                        banner: "<%= banner %>"

                    },

                    files: [{

                        src: "app/src/css/app.scss",
                        dest: "app/dist/css/app.css"

                    }]

                }

            },

            autoprefixer: {

                options: {

                    browsers: ["last 13 versions", "ie 9"]

                },

                prefixy: {

                    src: "app/dist/css/app.css"

                }

            }


        });

        // These plugins provide necessary tasks.
        grunt.loadNpmTasks("grunt-contrib-copy");
        grunt.loadNpmTasks("grunt-contrib-concat");
        grunt.loadNpmTasks("grunt-contrib-clean");
        grunt.loadNpmTasks("grunt-contrib-uglify");
        grunt.loadNpmTasks("grunt-contrib-jshint");
        grunt.loadNpmTasks("grunt-contrib-imagemin");
        grunt.loadNpmTasks("grunt-contrib-watch");
        grunt.loadNpmTasks("grunt-contrib-sass");

        grunt.loadNpmTasks("grunt-wiredep");
        grunt.loadNpmTasks("grunt-autoprefixer");

        // Default task.
        grunt.registerTask( "default", [ "clean", "wiredep", "copy", "sass", "autoprefixer", "jshint", "concat", "uglify" ]);

    };
