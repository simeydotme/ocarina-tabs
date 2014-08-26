
    var app = (function(exports) {

        // merge some constants into the app.
        $.extend( exports , {

            $TRACK: $(".stage .arrangement"),
            $TEMPLATE: $("#node-template")

        });

        exports.templates = {
            node: Handlebars.compile( exports.$TEMPLATE.html() )
        };


        exports._fixture = {
            nodes: [
                {
                    note: "5DN",
                    length: "8"
                },
                {
                    note: "5EN",
                    length: "8"
                },
                {
                    note: "5FS",
                    length: "4"
                },
                {
                    note: "5AN",
                    length: "2"
                }
            ]
        };


        exports.registerSounds = function() {

            var path = "src/audio";

            return {

                "4AN": new buzz.sound( path + "/4AN", { formats: [ "ogg", "mp3" ], preload: true, autoplay: false }),
                "4AS": new buzz.sound( path + "/4AS", { formats: [ "ogg", "mp3" ], preload: true, autoplay: false }),
                "4BF": new buzz.sound( path + "/4BF", { formats: [ "ogg", "mp3" ], preload: true, autoplay: false }),
                "4BN": new buzz.sound( path + "/4BN", { formats: [ "ogg", "mp3" ], preload: true, autoplay: false }),
                "5CN": new buzz.sound( path + "/5CN", { formats: [ "ogg", "mp3" ], preload: true, autoplay: false }),
                "5CS": new buzz.sound( path + "/5CS", { formats: [ "ogg", "mp3" ], preload: true, autoplay: false }),
                "5DF": new buzz.sound( path + "/5DF", { formats: [ "ogg", "mp3" ], preload: true, autoplay: false }),
                "5DN": new buzz.sound( path + "/5DN", { formats: [ "ogg", "mp3" ], preload: true, autoplay: false }),
                "5DS": new buzz.sound( path + "/5DS", { formats: [ "ogg", "mp3" ], preload: true, autoplay: false }),
                "5EF": new buzz.sound( path + "/5EF", { formats: [ "ogg", "mp3" ], preload: true, autoplay: false }),
                "5EN": new buzz.sound( path + "/5EN", { formats: [ "ogg", "mp3" ], preload: true, autoplay: false }),
                "5FN": new buzz.sound( path + "/5FN", { formats: [ "ogg", "mp3" ], preload: true, autoplay: false }),
                "5FS": new buzz.sound( path + "/5FS", { formats: [ "ogg", "mp3" ], preload: true, autoplay: false }),
                "5GF": new buzz.sound( path + "/5GF", { formats: [ "ogg", "mp3" ], preload: true, autoplay: false }),
                "5GN": new buzz.sound( path + "/5GN", { formats: [ "ogg", "mp3" ], preload: true, autoplay: false }),
                "5GS": new buzz.sound( path + "/5GS", { formats: [ "ogg", "mp3" ], preload: true, autoplay: false }),
                "5AF": new buzz.sound( path + "/5AF", { formats: [ "ogg", "mp3" ], preload: true, autoplay: false }),
                "5AN": new buzz.sound( path + "/5AN", { formats: [ "ogg", "mp3" ], preload: true, autoplay: false }),
                "5AS": new buzz.sound( path + "/5AS", { formats: [ "ogg", "mp3" ], preload: true, autoplay: false }),
                "5BF": new buzz.sound( path + "/5BF", { formats: [ "ogg", "mp3" ], preload: true, autoplay: false }),
                "5BN": new buzz.sound( path + "/5BN", { formats: [ "ogg", "mp3" ], preload: true, autoplay: false }),
                "6CN": new buzz.sound( path + "/6CN", { formats: [ "ogg", "mp3" ], preload: true, autoplay: false }),
                "6CS": new buzz.sound( path + "/6CS", { formats: [ "ogg", "mp3" ], preload: true, autoplay: false }),
                "6DF": new buzz.sound( path + "/6DF", { formats: [ "ogg", "mp3" ], preload: true, autoplay: false }),
                "6DN": new buzz.sound( path + "/6DN", { formats: [ "ogg", "mp3" ], preload: true, autoplay: false }),
                "6DS": new buzz.sound( path + "/6DS", { formats: [ "ogg", "mp3" ], preload: true, autoplay: false }),
                "6EF": new buzz.sound( path + "/6EF", { formats: [ "ogg", "mp3" ], preload: true, autoplay: false }),
                "6EN": new buzz.sound( path + "/6EN", { formats: [ "ogg", "mp3" ], preload: true, autoplay: false }),
                "6FN": new buzz.sound( path + "/6FN", { formats: [ "ogg", "mp3" ], preload: true, autoplay: false })

            };

        };




        exports.playNote = function( note ) {

            var extractedNote = false,
                regex = /♪[4-6]{1}[A-G]{1}[FNS]/;

            if( !note ) {

                console.warn( "attempted to play an invalid note" );
                return;

            }

            if( $.type( note ) === "string" ) {

                if( $.type( app.sounds[ note ] ) !== "undefined" ) {

                    extractedNote = note;

                } else {

                    console.error( "could find the note \"" + note + "\" for playback" );
                    return;

                }

            } else if( $.type( note ) === "object" ) {

                extractedNote = 
                    $( note )
                        .attr("class")
                        .match( regex )[0]
                        .replace("♪","");

            }

            if( extractedNote ) {
                app.sounds[ extractedNote ].play();
            }

        };






        

        exports._createTrack = function( data ) {

            return exports.templates.node( data );

        };

        exports.renderTrack = function( data ) {

            var html = exports._createTrack( data );
            exports.$TRACK.html( html );

        };






        var _handlebarsHelpers = (function() {

            Handlebars.registerHelper("noteName", function( note ) {

                return note.split("")[1];

            });

        }());





        exports.$TRACK.on("click", ".node", function(e) {

            exports.playNote( this );

        });





        exports.init = (function() {

            var e = exports;

            e.loadFonts();
            e.sounds = e.registerSounds();

        }());

        return exports;

    } (app || {}));