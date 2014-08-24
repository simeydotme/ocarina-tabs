   
       module.exports = function(grunt) {

        grunt.initConfig({

            pkg: grunt.file.readJSON("package.json"),

            banner: "<%= grunt.template.today(\"yyyy-mm-dd\") %>\n" +
            "* Copyright (c) <%= grunt.template.today(\"yyyy\") %> <%= pkg.author.name %>;",

            concat: {

                options: {

                    banner: "<%= banner %>",
                    stripBanners: true

                },

                dist: {

                    src: ["lib/<%= pkg.name %>.js"],
                    dest: "dist/<%= pkg.name %>.js"

                }

            },

            uglify: {

                options: {

                    banner: "<%= banner %>"

                },

                dist: {

                    src: "<%= concat.dist.dest %>",
                    dest: "dist/<%= pkg.name %>.min.js"

                }

            },

            jshint: {

                gruntfile: {

                    src: "Gruntfile.js"

                },

                lib_test: {

                    src: ["lib/**/*.js", "test/**/*.js"]

                }

            },

            watch: {

                gruntfile: {

                    files: "<%= jshint.gruntfile.src %>",
                    tasks: ["jshint:gruntfile"]

                },

                lib_test: {

                    files: "<%= jshint.lib_test.src %>",
                    tasks: ["jshint:lib_test", "qunit"]

                },

                sass: {

                    files: "app/**/*.scss",
                    tasks: ["sass"]

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

                        style: "expanded"

                    },

                    files: {

                        "app/src/css/app.css": "app/src/css/app.scss"

                    }

                }

            }


        });

        // These plugins provide necessary tasks.
        grunt.loadNpmTasks("grunt-contrib-concat");
        grunt.loadNpmTasks("grunt-contrib-uglify");
        grunt.loadNpmTasks("grunt-contrib-jshint");
        grunt.loadNpmTasks("grunt-contrib-watch");
        grunt.loadNpmTasks("grunt-contrib-sass");
        grunt.loadNpmTasks("grunt-wiredep");

        // Default task.
        grunt.registerTask("default", ["wiredep", "jshint", "concat", "uglify"]);

    };
