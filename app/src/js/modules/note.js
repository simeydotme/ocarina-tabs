

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

                    // if the note string doesn't exist in the notes array
                    console.error( "could find the Note \"" + note + "\" for playback..." );
                    return;

                }

            } else if( note instanceof jQuery ) {

                extractedNote = exports.note.getNote( note );

            }

            if( extractedNote ) {

                startTime = app.notes.startTimes[ extractedNote ] || 0;
                app.notes[ extractedNote ].stop().setTime( startTime ).play();

            }

        };



        /**
         * Function to add a note to the Model and the Page
         * @param {string} note - A 3-character string of a note, eg: "4AN"
         * @param {number} where - [optional] - Index of where to insert note (zero-index)
         * @param {number} duration - [optional] - Length note should be played for
         * @param {boolean} dot - [optional] - If the note is a "dot note"
         * @return {object} new note - An object containing the new note's details
         */
        exports.note.addNote = function() {

            var note = arguments[0],
                $notes = exports.$.score.find(".note"),
                where = $notes.length - 1,
                duration = exports.track.duration,
                dot = exports.track.dot,
                newNote,
                $newNote;

            if( $.type(note) !== "string" ) {
                console.warn( "Couldnt add note because it wasnt in the string format: \"5CN\"" );
                return;
            }

            if( arguments.length > 1 && $.type( arguments[1] ) === "number" ) {

                if( arguments[1] >= 0 ) {
                    where = arguments[1];
                } else {
                    where = 0;
                }

            }

            if( $.type( arguments[2] ) === "number" ) {

                duration = arguments[2];

            } 

            else if ( $.type( arguments[2] ) !== "undefined" ) {

                console.warn( "duration argument ("+ arguments[2] +") should be a number");
                
            }

            if( $.type( arguments[3] ) === "boolean" ) {

                dot = arguments[3];

            } 

            else if ( $.type( arguments[3] ) !== "undefined" ) {

                console.warn( "dot argument ("+ arguments[3] +") should be a boolean");
                
            }



            if( !$notes.length ) {
                where = 0;
            } 

            else if( where > $notes.length ) {
                where = $notes.length;
            }

            // create object and HTML for the new note.
            newNote = { note: note, duration: duration, dot: dot };
            $newNote = $(exports._createNotes( { notes: [ newNote ]} ));

            // if the track is empty, append note to track and set selected to 0.
            if( !$notes.length ) {

                exports.$.score.append( $newNote );
                exports.track.selected = 0;

            } 

            // if track is not empty, place the new note after
            // the chosen note. Select the next note in track.
            else {

                $notes.eq( where ).after( $newNote );
                exports.track.selected = where + 1;

            }

            console.info( "Adding a \""+ exports.noteNames[duration] +"\" note ("+ note +") at index ["+ (where + 1) +"]");

            pubsub.trigger("track.selectNote");
            pubsub.trigger("track.createNotesModel");
            
            exports.note.showNote( $newNote );
            return newNote;

        };




        /**
         * Remove a note from the song by index
         * @param  {number} index - the note in the song to remove (zero-index)
         * @return {array}
         */
        exports.note.removeNote = function( index, direction ) {

            var $notes = exports.$.score.find(".note"),
                last = $notes.length - 1,
                $removeNote;

            if( !direction || direction !== "forward" ) {
                direction = "back";
            }

            if( $.type(index) !== "undefined" ) {

                if( $.type(index) !== "number" ) {

                    console.warn( "Couldnt remove note, incorrectly supplied index" );
                    return;

                }

            } else {

                index = exports.track.selected;

            }

            if( direction === "forward" ) {

                if( index >= last ) {

                    index = last;

                }

            }

            if( index === 0 ) {

                exports.track.selected = 0;

            } else {

                if( direction !== "forward" || ( direction === "forward" && index >= last )  ) {

                    exports.track.selected = index - 1;

                } else {

                    exports.track.selected = index;

                }

            }

            $removeNote = $notes.eq( index );
            exports.note.hideNote( $removeNote );

            pubsub.trigger("track.selectNote");
            console.info( "Removing note ("+ $removeNote.attr("class") +") at index ["+ index +"]");

            return exports.model.notes;

        };





        exports.note.setLength = function( index, length, dot ) {

            if( $.type( index ) !== "number" || 
                $.type( length ) !== "number" ||
                $.type( dot ) !== "boolean" ) {

                console.warn( "Couldn't change length, no length/note-index was supplied");
                return false;

            }

            var $notes = exports.$.score.find(".note"),
                $note = $notes.eq(index),
                lengthClass = exports.note.getLengthClass( $note ),
                previousLength = exports.note.getLength( $note );

            $note
                .removeClass( lengthClass )
                .removeClass("note--dot")
                .addClass( "note--♫" + length );

            if( dot ) {

                $note.addClass("note--dot");

            }

            exports.track.duration = length;
            exports.track.dot = dot;

            pubsub.trigger("track.createNotesModel");

        };


        exports.note.changeLength = function( $el, direction ) {

            var currentLength = exports.note.getLength( $el ),
                noteIndex = exports.note.getIndex( $el ),
                isDot = exports.note.isDot( $el ),
                newDot = !isDot,
                newLength = currentLength;

            direction = direction || "faster";

            for( var i in app.noteLengths ) {

                if( app.noteLengths[ i ] === currentLength ) {

                    if( direction === "faster" && !isDot ) {

                        if( typeof app.noteLengths[ parseInt(i) + 1 ] !==  "undefined" ) {

                            newLength = app.noteLengths[ parseInt(i) + 1 ];

                        } else {

                            newDot = isDot;

                        }

                    }

                    else if ( direction === "slower" && isDot ) {

                        if( typeof app.noteLengths[ parseInt(i) - 1 ] !==  "undefined" ) {

                            newLength = app.noteLengths[ parseInt(i) - 1 ];

                        } else {

                            newDot = isDot;

                        }

                    }

                }

            }

            exports.note.setLength( noteIndex, newLength, newDot );

        };



        exports.note.getLengthClass = function( $el ) {

            var regex = /note--♫[0-9]{1,2}/,
                lengthClass = $el.attr("class").match( regex )[0];

            return lengthClass;

        };

        exports.note.getLength = function( $el ) {

            var lengthClass = app.note.getLengthClass( $el ).replace("note--♫",""),
                length = parseInt( lengthClass, 10 );

            return length;

        };

        exports.note.getNoteClass = function( $el ) {

            var regex = /note--♪(([4-6]{1}[A-G]{1}[FNS])|(PAUSE)|(BAR)|(RETURN))/,
                noteClass = $el.attr("class").match( regex )[0];

            return noteClass;

        };

        exports.note.getNote = function( $el ) {

            var note = app.note.getNoteClass( $el ).replace("note--♪","");

            return note;

        };

        exports.note.isDot = function( $el ) {

            return $el.hasClass("note--dot");

        };

        exports.note.getIndex = function( $el ) {
            
            var $notes = exports.$.score.find(".note");

            return $notes.index( $el );

        };

        exports.note.getSelectedNote = function() {
            
            var $notes = exports.$.score.find(".note"),
                $selected = $notes.eq( exports.track.selected );

            return $selected;

        };









        exports.note.showNote = function( $el ) {

            var margin = $el.css("margin-right"),
                width = $el.css("width"),
                $tab = $el.find(".note__tab");

            $el
                .css({
                    transition: "none",
                    opacity: 0
                })

                .velocity({ 
                    width: [width, 0],
                    marginRight: [margin, 0]
                }, {
                    queue: false,
                    duration: 230
                })

                .velocity({ 
                    opacity: 1 
                }, {
                    queue: false,
                    duration: 100,
                    delay: 130,
                    complete: function(els) {

                        $(els).attr("style","");

                    }
                });

            $tab
                .velocity({
                    translateY: "18px"
                },0)

                .velocity({ 
                    translateY: 0
                }, { 
                    duration: 500, 
                    delay: 180,
                    easing: [1200,30]
                });

            

        };






        exports.note.hideNote = function( $el ) {

            var index,
                $notes = exports.$.score.find(".note"),
                $tab = $el.find(".note__tab");

            $el.velocity({ 
                opacity: 0
            }, {
                queue: false,
                duration: 200,
                easing: "easeInOutSine"
            });

            $tab.velocity({ 
                translateY: 30 
            }, { 
                duration: 200,
                easing: "easeOut" 
            });

            $el
                .css("transition", "none")

                .velocity({ 
                    width: 0
                }, {
                    queue: false,
                    duration: 200,
                    delay: 150,
                    complete: function( elements ) {

                        $(elements).remove();
                        pubsub.trigger("track.createNotesModel");
                        pubsub.trigger("track.selectNote");

                    }
                });

        };










        exports.note.handleKeydown = function(e) {

            var key = e.which,
                keymap = exports._keymap,
                $target = $(e.target),
                $selected = exports.note.getSelectedNote();

            // instantly prevent our handlers when inside an input.
            if( $target.is(":input") || $target.prop("contenteditable") === "true" ) {
                return;
            }

            // need to stop the browser interpreting our keys
            for( var i in keymap ) {
                if( key === keymap[i] ) {
                    e.preventDefault();
                    console.info( "pressed key " + keymap[i] );
                }
            }


            switch( key ) {

                case keymap.up:

                    exports.note.changeLength( $selected , "slower" );
                    break;

                case keymap.down:

                    exports.note.changeLength( $selected , "faster" );
                    break;

                case keymap.left:

                    pubsub.trigger("track.selectPreviousNote");
                    break;

                case keymap.right:

                    pubsub.trigger("track.selectNextNote");
                    break;

            }

        };



        exports.note.handleKeyup = function(e) {

            var key = e.which,
                keymap = exports._keymap,
                $target = $(e.target),
                $selected = exports.note.getSelectedNote();

            if( $target.is(":input") || $target.prop("contenteditable") === "true" ) {
                return;
            }


            switch( key ) {

                case keymap.backspace:

                    exports.note.removeNote( exports.track.selected );
                    e.preventDefault();
                    break;

                case keymap.delete:

                    exports.note.removeNote( exports.track.selected , "forward" );
                    e.preventDefault();
                    break;

                case keymap.left:

                    exports.note.playNote( $selected );
                    break;

                case keymap.right:

                    exports.note.playNote( $selected );
                    break;

            }

        };




        exports.note.handleMouseup = function(e) {

                var $notes = exports.$.score.find(".note"),
                    $this = $(this);

                exports.track.selected = $notes.index( $this );
                exports.note.playNote( $this );

                pubsub.trigger("track.selectNote");

        };








        exports.note.events = function() {


        };


        exports.note.init = (function() {

            exports.note.events();

        }());

        return exports;

    } (app || {}));