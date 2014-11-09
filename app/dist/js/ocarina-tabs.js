/*
 * ocarina-tabs | ♪♫ | 0.0.3 | ♫♪ | 2014-11-09
 * https://github.com/simeydotme/ocarina-tabs
 * Licenced (MIT) 2014 | ♪ | Simon Goellner;
 */
    
    // pubsub with jquery! woot.
    var pubsub = $({});

    var app = (function(exports) {

        exports.templates = {};
        exports.$ = {};

        exports.$.doc = $(document);
        exports.$.window = $(window);
        exports.$.body = $("body");

        exports.$.title = $(".stage__title");
        exports.$.score = $(".stage__score");
        
        exports.$.piano = $(".input-piano");
        exports.$.pianoOcarina = $(".input-area .note");
        exports.$.pianoKeys = exports.$.piano.find(".key");

        exports.$.titleTemplate = $("#title-template");
        exports.$.noteTemplate = $("#note-template");

        return exports;

    } (app || {}));

    

    var app = (function(exports) {

        var introTune = function() {

            setTimeout( function() {

                var speed = 130;
                app.playNote("5AN");
                setTimeout(function(){ app.playNote("5GS"); },speed);
                setTimeout(function(){ app.playNote("5DS"); },speed*2);
                setTimeout(function(){ app.playNote("4BN"); },speed*3);
                setTimeout(function(){ app.playNote("4AS"); },speed*4);
                setTimeout(function(){ app.playNote("5DN"); },speed*5);
                setTimeout(function(){ app.playNote("5FS"); },speed*6);
                setTimeout(function(){ app.playNote("6CN"); },speed*7);

            }, 1000 );

        };

        exports.init = (function() {

            exports.model = window.fixture || { notes: [] };

            exports.loadFonts(function() {
                exports._renderSong( exports.model );
            });
            
            //introTune();

        }());

        return exports;

    } (app || {}));
    

    var app = (function(exports) {

        exports.inputArea = {};
        exports.$.inputArea = $(".input-area");
        exports.$.inputAreaHeader = $(".input-header");

        exports.inputArea.movable = function() {

            exports.$.inputArea.draggable({

                handle: exports.$.inputAreaHeader,
                containment: exports.$.body,
                appendTo: exports.$.body,
                opacity: 0.6,
                create: function() { pubsub.trigger("inputArea.created"); },
                stop: function() { pubsub.trigger("inputArea.finishedDragging"); }

            });

        };

        exports.inputArea.setCoords = function() {

            var coords = {},
                json;

                coords.x = parseInt( exports.$.inputArea.css("left").replace("px","") );
                coords.y = parseInt( exports.$.inputArea.css("top").replace("px","") );

            json = JSON.stringify( coords );

            localStorage.setItem( "inputCoords", json );

        };

        /**
         * Get the Dimensions that the input area/piano should be at
         * @return {object} object with the left/top coords and width/height
         */
        exports.inputArea.getDimensions = function() {

            var coords, 
                json, 
                browser,
                box,
                buffer = 30;

            json = localStorage.getItem( "inputCoords", json );
            coords = JSON.parse( json ) || { x: 9999, y: 9999 };

            browser = { 
                w: exports.$.window.width(),
                h: exports.$.window.height()
            };

            box = {
                w: exports.$.inputArea.width(),
                h: exports.$.inputArea.height()
            };

            if( browser.w < coords.x + box.w ) { 
                coords.x = browser.w - box.w - 30;
            }

            if( browser.h < coords.y + box.h ) { 
                coords.y = browser.h - box.h - 30;
            }

            return {

                left: coords.x, 
                top: coords.y,
                width: box.w,
                height: box.h

            };

        };

        exports.inputArea.show = function() {

            var $area = exports.$.inputArea,
                dimensions = exports.inputArea.getDimensions();

            $area

                .velocity({

                    opacity: [1, 0],
                    top: [ dimensions.top, dimensions.top + 30 ],
                    left: [ dimensions.left, dimensions.left ],
                    translateZ: 0

                }, {

                    duration: 800,
                    easing: [ 500, 20 ],
                    queue: false,
                    delay: 500

                });

        };

        exports.inputArea.pubsub = function() {

            pubsub.on("inputArea.created", exports.inputArea.show );
            pubsub.on("inputArea.finishedDragging", exports.inputArea.setCoords );

        };

        exports.inputArea.init = (function() {

            exports.inputArea.pubsub();
            exports.inputArea.movable();

        }());

        return exports;

    } (app || {}));


    var app = (function(exports) {

        exports.interactions = {};

        exports.interactions.events = function() {


            var evup = Modernizr.touch ? "touchend" : "mouseup",
                evdown = Modernizr.touch ? "touchstart" : "mousedown";


            exports.$.score.on( evup + ".note", ".note", exports.note.handleMouseup );

            exports.$.doc.on("keyup.note", exports.note.handleKeyup );
            exports.$.doc.on("keydown.note", exports.note.handleKeydown );

            exports.$.pianoKeys.on("mouseover.key", exports.piano.mouseover );
            exports.$.pianoKeys.on("mouseout.key", exports.piano.mouseout );
            exports.$.pianoKeys.on( evup + ".key", exports.piano.mouseup );
            exports.$.pianoKeys.on( evdown + ".key", exports.piano.mousedown );


        };


        exports.interactions.init = (function() {

            exports.interactions.events();

        }());

        return exports;

    } (app || {}));


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
    

    var app = (function(exports) {

        exports.noteLengths = [ 1, 2, 4, 8, 16, 32 ];

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

        exports.notes = exports.registerSounds("");
        return exports;

    } (app || {}));
    

    var app = (function(exports) {

        exports.piano = {};

        exports.piano.highlightKey = function( e ) {

                var $this = $( this ),
                    key = $this.data("key");

            $this.addClass( "key--active" );
            exports.$.pianoOcarina.addClass( "note--♪" + key );

        };

        exports.piano.dimKeys = function() {

            exports.$.pianoKeys.removeClass( "key--active" );
            exports.$.pianoOcarina.removeClass(function (index, css) {
                return (css.match (/(^|\s)note--♪\S+/g) || []).join(' ');
            });

        };

        exports.piano.mouseover = function( e ) {

            exports.piano.dimKeys();
            exports.piano.highlightKey.call( this, e );

        };

        exports.piano.mouseout = function( e ) {
                
            exports.piano.dimKeys();

        };

        exports.piano.mousedown = function( e ) {

            exports.note.playNote( $(this).data("key") );
            exports.$.pianoKeys.on("mouseover.mousedown", exports.piano.mousedownover );

        };

        exports.piano.mousedownover = function( e ) {

            exports.note.playNote( $(this).data("key") );

        };

        exports.piano.mouseup = function( e ) {

            exports.$.pianoKeys.off("mouseover.mousedown");
            exports.note.addNote( $(this).data("key") , exports.track.selected );

        };
        
        exports.piano.events = function() {

        };

        exports.piano.init = (function() {

            exports.piano.events();

        }());

        return exports;

    } (app || {}));
    

    var app = (function(exports) {

        exports.templates = {};

        exports.templates.title = Handlebars.compile( exports.$.titleTemplate.html() );
        exports.templates.note = Handlebars.compile( exports.$.noteTemplate.html() );

        return exports;

    } (app || {}));


    var app = (function(exports) {

        exports.track = {};
        exports.track.selected = 0;
        exports.track.duration = 4;
        exports.track.dot = false;




        exports.track.selectNote = function() {

            var index = exports.track.selected;

            exports.$.score
                .find(".note--selected")
                .removeClass("note--selected");

            exports.$.score
                .find(".note")
                .eq( index )
                .addClass("note--selected");

        };

        exports.track.selectNextNote = function() {

            var lastIndex = exports.$.score.find(".note").length - 1,
                current = exports.track.selected;

            exports.track.selected = ( current + 1 > lastIndex ) ? lastIndex : current + 1;
            pubsub.trigger("track.selectNote");

            console.info("Selecting new note: [" + exports.track.selected + "]");

        };

        exports.track.selectPreviousNote = function() {

            var firstIndex = 0,
                current = exports.track.selected;

            exports.track.selected = ( current - 1 < firstIndex ) ? firstIndex : current - 1;
            pubsub.trigger("track.selectNote");

            console.info("Selecting new note: [" + exports.track.selected + "]");

        };





        exports.track.playSong = function( bpm, onebeat ) {

            pubsub.trigger("track.playSong");
            pubsub.off("track.playSong");

            var timer,
                $el, 
                note, 
                length = 1000,
                regex = /♫[0-9]{1,2}/,
                $notes = $(".stage__score .note");

            // start from beginning if we're at the end
            if( app.track.selected === $notes.length - 1 ) {
                app.track.selected = 0;
            }

            bpm = bpm || 72;
            onebeat = onebeat || 4;

            var loop = function() {

                $("body").on("click", ".note, .key", function() {
                    clearTimeout( timer );
                });

                pubsub.on("track.playSong track.stopSong", function() {
                    clearTimeout( timer );
                });

                timer = setTimeout( function() {

                    $el = $(".stage__score .note").eq( app.track.selected );

                    if( $el.length ) {

                        note = parseInt( $el.attr("class").match( regex )[0].replace("♫",""), 10 );
                        length = (((60 / bpm) * onebeat) / note ) * 1000;

                        if( $el.hasClass("note--dot") ) {
                            length = length + ( length * 0.5 );
                        }

                        console.log( length );

                        app.note.playNote( $el );
                        pubsub.trigger("track.selectNote");

                        app.track.selected += 1;
                        loop();

                    } else {

                        app.track.selected = $notes.length - 1;

                    }

                }, length );

            };

            loop();

        };


        exports.track.stopSong = function() {

            pubsub.trigger("track.stopSong");

        };


        /**
         * Function for creating the model out of the
         * current track state.
         * 
         * @return {array} Array of notes in Model
         */
        exports.track.createNotesModel = function() {

            var $note, duration, note, dot, notes;

            notes = $(".stage__score .note").map(function(k,v) {

                $note = $(v);

                dot = app.note.isDot( $note );
                note  = app.note.getNote( $note );
                duration = app.note.getLength( $note );

                return { "note": note, "duration": duration, "dot": dot };

            }).get();

            console.info("Building notes model...");
            app.model.notes = notes;

            return notes;

        };



        exports.track.createTitleModel = function() {

            var title = exports.$.title.children(".title__main").text(),
                subtitle = exports.$.title.children(".title__sub").text();

            console.info("Building titles model...");

            app.model.title = title;
            app.model.subtitle = subtitle;

            return { title: title, subtitle: subtitle };

        };



        

        exports._createTitle = function( data ) {
            return exports.templates.title( data );
        };
        
        exports._createNotes = function( data ) {
            return exports.templates.note( data );
        };

        exports._renderSong = function( data ) {

            if( !data ) {

                console.warn( "Cannot create song as there is no supplied data" );
                return;

            }

            var title = exports._createTitle( data );
            var notes = exports._createNotes( data );
            exports.$.title.html( title );
            exports.$.score.html( notes );

            exports.track.selected = exports.$.score.find(".note").length - 1;

            pubsub.trigger("track.showTitle");
            pubsub.trigger("track.showNotes");
            pubsub.trigger("track.selectNote");

        };



        exports.track.showTitle = function() {

            var $main = exports.$.title.children(".title__main"),
                $sub = exports.$.title.children(".title__sub"),
                $author = exports.$.title.children(".title__author");

            $main.add( $sub )

                .velocity({

                    transition: "none",
                    opacity: 0,
                    translateY: -15,
                    translateZ: 0

                }, 0 );

            $main.velocity({

                opacity: 1,
                translateY: 0

            }, {

                duration: 200,
                easing: "easeOut"

            });

            $sub.velocity({

                opacity: 1,
                translateY: 0

            }, {

                duration: 200,
                easing: "easeOut",
                delay: 100 

            });

            $author.velocity({

                opacity: [ 1, 0 ],
                translateX: [ 0 , 200 ]

            }, 200, "easeOut" );

        };


        exports.track.showNotes = function() {

            exports.$.score
                .find(".note")
                .velocity("transition.slideRightIn",
                    {
                        stagger: 30,
                        display: "inline-block"
                    });

        };




        exports.track.events = function() {

            pubsub.on("track.selectNote", exports.track.selectNote );
            pubsub.on("track.selectNextNote", exports.track.selectNextNote );
            pubsub.on("track.selectPreviousNote", exports.track.selectPreviousNote );

            pubsub.on("track.showTitle", exports.track.showTitle );
            pubsub.on("track.showNotes", exports.track.showNotes );

            pubsub.on("track.createNotesModel", exports.track.createNotesModel );
            pubsub.on("track.createTitleModel", exports.track.createTitleModel );

        };

        exports.track.init = (function() {

            exports.track.events();

        }());

        return exports;

    } (app || {}));

    var app = (function(exports) {

        exports.loadFonts = function( callback ) {

            WebFontConfig = {

                google: {
                    families: ["Lato", "IM Fell DW Pica"]
                },

                active: function() {
                    callback.call();
                }
                
            };

            (function() {
                var wf = document.createElement("script");
                wf.src = ("https:" == document.location.protocol ? "https" : "http") +
                "://ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js";
                wf.type = "text/javascript";
                wf.async = "true";
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(wf, s);
            })();

        };

        return exports;

    } (app || {}));