

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

            pubsub.trigger("playSong");
            pubsub.off("playSong");

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

                pubsub.on("playSong", function() {
                    clearTimeout( timer );
                });

                timer = setTimeout( function() {

                    $el = $(".stage__score .note").eq( app.track.selected );

                    if( $el.length ) {

                        note = parseInt( $el.attr("class").match( regex )[0].replace("♫",""), 10 );
                        length = (((60 / bpm) * onebeat) / note ) * 1000;

                        app.playNote( $el );
                        pubsub.trigger("selectNote");

                        app.track.selected += 1;
                        loop();

                    } else {

                        app.track.selected = $notes.length - 1;

                    }

                }, length );

            };

            loop();

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
            pubsub.on("selectNote", exports.track.selectNote );
        };

        exports.track.init = (function() {
            exports.track.events();
        }());

        return exports;

    } (app || {}));