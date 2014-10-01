

    var app = (function(exports) {

        exports.track = {};
        exports.track.selected = 0;




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
        exports.track.createModel = function() {

            var $note, duration, note, dot, notes;

            notes = $(".stage__score .note").map(function(k,v) {

                $note = $(v);

                dot = app.note.isDot( $note );
                note  = app.note.getNote( $note );
                duration = app.note.getSpeed( $note );

                return { "note": note, "duration": duration, "dot": dot };

            }).get();

            console.info("Building model...");
            app.model.notes = notes;

            return notes;

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
            pubsub.trigger("selectNote");

        };




        exports.track.events = function() {

            pubsub.on("track.selectNote", exports.track.selectNote );
            pubsub.on("track.createModel", exports.track.createModel );

        };

        exports.track.init = (function() {

            exports.track.events();

        }());

        return exports;

    } (app || {}));