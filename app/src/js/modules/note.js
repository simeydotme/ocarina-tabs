

    var app = (function(exports) {

        exports.note = {};



        exports.note.playNote = function( note ) {

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
        exports.note.addNote = function() {

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

            pubsub.trigger("track.selectNote");

            console.info( "Adding a \""+ exports.noteNames[duration] +"\" note ("+ note +") at index ["+ (where + 1) +"]");
            
            exports.note.showNote( $newNote );
            return newNote;

        };





        exports.note.removeNote = function( index ) {

            var $notes = exports.$.score.find(".note"),
                last = $notes.length-1,
                $removeNote;

            if( $.type(index) !== "undefined" ) {
                if( $.type(index) !== "number" ) {
                    console.warn( "Couldnt remove note, incorrectly supplied index" );
                    return;
                }
            } else {
                index = app.track.selected;
            }

            $removeNote = $notes.eq( index );
            console.info( "Removing note ("+ $removeNote.attr("class") +") at index ["+ index +"]");
          
            exports.note.hideNote( $removeNote );

            return exports.model.notes.splice( index, 1 );

        };





        exports.note.changeSpeed = function( index, speed, dot ) {

            if( typeof index !== "number" || !speed ) {

                console.warn( "Couldn't change speed, no speed/note-index was supplied");
                return false;

            }

            var $notes = exports.$.score.find(".note"),
                $note = $notes.eq(index),
                speedClass = exports.note.getSpeedClass( $note ),
                previousSpeed = exports.note.getSpeed( $note ),
                newNote = app.model.notes[index];

            $note
                .removeClass( speedClass )
                .addClass( "note--♫" + speed );

            newNote.duration = speed;

            if( !dot ) {

                newNote.dot = false;
                $note.removeClass("note--dot");

            } else {

                newNote.dot = true;
                $note.addClass("note--dot");

            }

        };



        exports.note.getSpeedClass = function( $el ) {

            var regex = /note--♫[0-9]{1,2}/,
                speedClass = $el.attr("class").match( regex )[0];

            return speedClass;

        };

        exports.note.getSpeed = function( $el ) {

            var regex = /♫[0-9]{1,2}/,
                speed = parseInt( $el.attr("class").match( regex )[0].replace("♫",""), 10 );

            return speed;

        };




        exports.note.showNote = function( $el ) {

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






        exports.note.hideNote = function( $el ) {

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
                            exports.track.selected = index - 1;
                        }

                        pubsub.trigger("track.selectNote");

                    }
                });

        };


        exports.note.events = function() {


            exports.$.score.on("mouseup.note", ".note", function(e) {

                var $notes = exports.$.score.find(".note");
                exports.track.selected = $notes.index( $(this) );

                exports.note.playNote( this );
                pubsub.trigger("track.selectNote");

            });



            exports.$.score.on("keyup.note", ".note", function(e) {

            });


        };

        exports.note.init = (function() {
            exports.note.events();
        }());

        return exports;

    } (app || {}));