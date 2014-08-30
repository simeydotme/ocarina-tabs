    

    var app = (function(exports) {

        exports.noteNames = {
            1: "breve",
            2: "semibreve",
            4: "crotchet",
            8: "quaver",
            16: "semiquaver",
            32: "demisemiquaver"
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
                app.notes[ extractedNote ].play();
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
                $notes = $(".stage__score .note"),
                where = $notes.length-1,
                duration = 4,
                newNote,
                $newNote;

            if( $.type(note) !== "string" ) {
                console.warn( "Couldnt add note because it wasnt in the string format: \"5CN\"" );
                return;
            }

            if( arguments.length === 2 && $.type( arguments[1] ) === "number" ) {

                where = arguments[1];

            } else if( arguments.length === 3 && $.type( arguments[2] ) === "number" ) {

                where = arguments[2];

                if( $.type( arguments[1] ) === "number" ) {
                    duration = arguments[1];
                } else {
                    console.warn( "duration argument ("+ arguments[1] +") should be a number");
                }

            }

            newNote = { note: note, duration: duration };
            console.info( "Adding a \""+ exports.noteNames[duration] +"\" note ("+ note +") at index ["+ where +"]");


            exports.model.notes.splice( where, 0, newNote );
            
            $newNote = $(exports._createNotes( { notes: [ newNote ]} ));
            
            // bit of funky logic because when the index is 0/1 we need
            // to place it either before or after 0 index.
            switch(where) {

                case 0:
                    $notes.eq(0).before( $newNote );
                    break;

                case 1:
                    $notes.eq(0).after( $newNote );
                    break;

                default:
                    $notes.eq(where).after( $newNote );
            }
            
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
                    top: "-10px", 
                    opacity: 0,
                    marginRight: 0
                })

                .velocity({ 
                    width: width,
                    marginRight: margin
                }, {
                    queue: false,
                    duration: 200
                })

                .velocity({ 
                    top: 0, 
                    opacity: 1 
                }, {
                    queue: false,
                    duration: 200,
                    delay: 180
                });

        };






        exports.hideNote = function( $el ) {

            $el
                .velocity({ 
                    top: "-10px", 
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
                        $(elements).remove();
                    }
                });

        };







        exports.notes = exports.registerSounds();
        return exports;

    } (app || {}));