    

    var app = (function(exports) {

        exports.noteNames = {

            1: "breve",
            2: "semibreve",
            4: "crotchet",
            8: "quaver",
            16: "semiquaver",
            32: "demisemiquaver"

        };

        exports.registerSounds = function( type ) {

            var path = "src/audio/ocarina",
                preload = true,
                autoplay = false;

            if( !type || type === "ocarina" ) {

                return {

                    "4AN": new buzz.sound( path + "/4AN", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                    "4AS": new buzz.sound( path + "/4AS", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                    "4BF": new buzz.sound( path + "/4BF", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                    "4BN": new buzz.sound( path + "/4BN", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                    "5CN": new buzz.sound( path + "/5CN", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                    "5CS": new buzz.sound( path + "/5CS", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                    "5DF": new buzz.sound( path + "/5DF", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                    "5DN": new buzz.sound( path + "/5DN", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                    "5DS": new buzz.sound( path + "/5DS", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                    "5EF": new buzz.sound( path + "/5EF", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                    "5EN": new buzz.sound( path + "/5EN", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                    "5FN": new buzz.sound( path + "/5FN", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                    "5FS": new buzz.sound( path + "/5FS", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                    "5GF": new buzz.sound( path + "/5GF", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                    "5GN": new buzz.sound( path + "/5GN", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                    "5GS": new buzz.sound( path + "/5GS", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                    "5AF": new buzz.sound( path + "/5AF", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                    "5AN": new buzz.sound( path + "/5AN", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                    "5AS": new buzz.sound( path + "/5AS", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                    "5BF": new buzz.sound( path + "/5BF", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                    "5BN": new buzz.sound( path + "/5BN", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                    "6CN": new buzz.sound( path + "/6CN", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                    "6CS": new buzz.sound( path + "/6CS", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                    "6DF": new buzz.sound( path + "/6DF", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                    "6DN": new buzz.sound( path + "/6DN", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                    "6DS": new buzz.sound( path + "/6DS", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                    "6EF": new buzz.sound( path + "/6EF", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                    "6EN": new buzz.sound( path + "/6EN", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                    "6FN": new buzz.sound( path + "/6FN", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),

                    "startTimes": {}

                };

            } else if( type === "piano" ) {

                path = "src/audio/piano";

                return {

                    "4AN": new buzz.sound( path + "/4AN", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                    "4AS": new buzz.sound( path + "/4AS", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                    "4BF": new buzz.sound( path + "/4BF", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                    "4BN": new buzz.sound( path + "/4BN", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                    "5CN": new buzz.sound( path + "/5CN", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                    "5CS": new buzz.sound( path + "/5CS", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                    "5DF": new buzz.sound( path + "/5DF", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                    "5DN": new buzz.sound( path + "/5DN", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                    "5DS": new buzz.sound( path + "/5DS", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                    "5EF": new buzz.sound( path + "/5EF", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                    "5EN": new buzz.sound( path + "/5EN", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                    "5FN": new buzz.sound( path + "/5FN", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                    "5FS": new buzz.sound( path + "/5FS", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                    "5GF": new buzz.sound( path + "/5GF", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                    "5GN": new buzz.sound( path + "/5GN", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                    "5GS": new buzz.sound( path + "/5GS", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                    "5AF": new buzz.sound( path + "/5AF", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                    "5AN": new buzz.sound( path + "/5AN", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                    "5AS": new buzz.sound( path + "/5AS", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                    "5BF": new buzz.sound( path + "/5BF", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                    "5BN": new buzz.sound( path + "/5BN", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                    "6CN": new buzz.sound( path + "/6CN", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                    "6CS": new buzz.sound( path + "/6CS", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                    "6DF": new buzz.sound( path + "/6DF", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                    "6DN": new buzz.sound( path + "/6DN", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                    "6DS": new buzz.sound( path + "/6DS", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                    "6EF": new buzz.sound( path + "/6EF", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                    "6EN": new buzz.sound( path + "/6EN", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                    "6FN": new buzz.sound( path + "/6FN", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),

                    "startTimes": {

                        "4AN": 0.80,
                        "4AS": 0.31,
                        "4BF": 0.31,
                        "4BN": 0.64,
                        "5CN": 0.62,
                        "5CS": 0.60,
                        "5DF": 0.60,
                        "5DN": 0.74,
                        "5DS": 0.60,
                        "5EF": 0.60,
                        "5EN": 0.76,
                        "5FN": 0.64,
                        "5FS": 0.42,
                        "5GF": 0.42,
                        "5GN": 0.70,
                        "5GS": 0.60,
                        "5AF": 0.60,
                        "5AN": 0.30,
                        "5AS": 0.50,
                        "5BF": 0.50,
                        "5BN": 0.55,
                        "6CN": 0.27,
                        "6CS": 0.70,
                        "6DF": 0.70,
                        "6DN": 0.42,
                        "6DS": 0.70,
                        "6EF": 0.70,
                        "6EN": 0.70,
                        "6FN": 0.80,

                    }

                };

            }

        };

        exports.playNote = function( note ) {

            var extractedNote = false,
                startTime = 0,
                regex = /♪[4-6]{1}[A-G]{1}[FNS]/;

            if( !note ) {

                console.warn( "no Note was supplied for playback..." );
                return;

            }

            if( $.type( note ) === "string" ) {

                if( $.type( app.notes[ note ] ) !== "undefined" ) {

                    extractedNote = note;

                } else {

                    console.error( "could find the Note \"" + note + "\" for playback..." );
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

                startTime = app.notes.startTimes[ extractedNote ] || 0;
                app.notes[ extractedNote ].stop().setTime( startTime ).play();

            }

        };



        /**
         * Function to add a note to the Model and the Page
         * @param {String} note
         * @param {Number} where - optional
         * @param {Number} duration - optional
         */
        exports.addNote = function() {

            var note = arguments[0],
                $notes = exports.$.score.find(".note"),
                where = $notes.length - 1,
                duration = 4,
                newNote,
                $newNote;

            if( $.type(note) !== "string" ) {
                console.warn( "Couldnt add note because it wasnt in the string format: \"5CN\"" );
                return;
            }

            if( arguments.length === 2 && $.type( arguments[1] ) === "number" ) {

                if( arguments[1] >= 0 ) {
                    where = arguments[1];
                } else {
                    where = 0;
                }

            } else if( arguments.length === 3 && $.type( arguments[1] ) === "number" ) {

                if( arguments[1] >= 0 ) {
                    where = arguments[1];
                } else {
                    where = 0;
                }

                if( $.type( arguments[2] ) === "number" ) {
                    duration = arguments[2];
                } else {
                    console.warn( "duration argument ("+ arguments[2] +") should be a number");
                }

            }

            if( !$notes.length ) {
                where = 0;
            } 

            else if( where > $notes.length ) {
                where = $notes.length;
            }

            newNote = { note: note, duration: duration };
            exports.model.notes.splice( where + 1, 0, newNote );
            
            $newNote = $(exports._createNotes( { notes: [ newNote ]} ));

            if( !$notes.length ) {
                exports.$.score.append( $newNote );
                exports.track.selected = 0;
            } 

            else {
                $notes.eq( where ).after( $newNote );
                exports.track.selected = where + 1;
            }

            pubsub.trigger("selectNote");

            console.info( "Adding a \""+ exports.noteNames[duration] +"\" note ("+ note +") at index ["+ (where + 1) +"]");
            
            exports.showNote( $newNote );
            return newNote;

        };




        exports.removeNote = function( index ) {

            var $notes = $(".stage__score .note"),
                last = $notes.length-1,
                $removeNote;

            if( $.type(index) !== "undefined" ) {
                if( $.type(index) !== "number" ) {
                    console.warn( "Couldnt remove note, incorrectly supplied index" );
                    return;
                }
            } else {
                index = last;
            }

            $removeNote = $notes.eq( index );
            console.info( "Removing note ("+ $removeNote.attr("class") +") at index ["+ index +"]");
          
            exports.hideNote( $removeNote );

            return exports.model.notes.splice( index, 1 );

        };






        exports.showNote = function( $el ) {

            var margin = $el.css("margin-right");
            var width = $el.css("width");

            $el
                .css({ 
                    width: 0, 
                    left: "-10px", 
                    opacity: 0,
                    marginRight: 0
                })

                .velocity({ 
                    width: width,
                    marginRight: margin
                }, {
                    queue: false,
                    duration: 380
                })

                .velocity({ 
                    left: 0, 
                    opacity: 1 
                }, {
                    queue: false,
                    duration: 200,
                    delay: 180
                });

        };






        exports.hideNote = function( $el ) {

            var index,
                $notes = exports.$.score.find(".note");

            $el
                .velocity({ 
                    left: "-10px", 
                    opacity: 0 
                }, {
                    queue: false,
                    duration: 200
                })

                .velocity({ 
                    width: 0,
                    marginRight: 0
                }, {
                    queue: false,
                    duration: 200,
                    delay: 180,
                    complete: function( elements ) {

                        var $elements = $(elements);
                        index = $notes.index( $elements );

                        $elements.remove();

                        if( index === 0 ) {
                            exports.track.selected = 0;
                        } else {
                            exports.track.selected = index + 1;
                        }

                        pubsub.trigger("selectNote");

                    }
                });

        };



        exports.$.score.on("mouseup.note", ".note", function(e) {

            var $notes = exports.$.score.find(".note");
            exports.track.selected = $notes.index( $(this) );

            exports.playNote( this );
            pubsub.trigger("selectNote");

        });

        exports.$.score.on("keyup.note", ".note", function(e) {



        });



        exports.notes = exports.registerSounds("");
        return exports;

    } (app || {}));