   
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

                    src: ["src/js/app.js", "src/js/init.js", "src/js/modules/*.js"],
                    dest: "dist/js/<%= pkg.name %>.js"

                }

            },

            copy: {

                main: {

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
                    dest: "dist/<%= pkg.name %>.min.js"

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

                dev: {

                    files: ["app/**/*.scss", "app/**/*.js", "app/**/*.html"],
                    tasks: ["wiredep", "sass", "autoprefixer", "jshint", "copy"]

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
        grunt.loadNpmTasks("grunt-contrib-uglify");
        grunt.loadNpmTasks("grunt-contrib-jshint");
        grunt.loadNpmTasks("grunt-contrib-imagemin");
        grunt.loadNpmTasks("grunt-contrib-watch");
        grunt.loadNpmTasks("grunt-contrib-sass");

        grunt.loadNpmTasks("grunt-wiredep");
        grunt.loadNpmTasks("grunt-autoprefixer");

        // Default task.
        grunt.registerTask("default", ["wiredep", "jshint", "concat", "uglify"]);

    };
