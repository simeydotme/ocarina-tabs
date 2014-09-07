

    var app = (function(exports) {

        exports.track = {};
        exports.track.selected = 0;

        exports.track.selectNote = function() {

            var index;

            if( exports.track.selected === 0 ) {
                index = 0;
            } else {
                index = exports.track.selected - 1;
            }

            exports.$.score
                .find(".note--selected")
                .removeClass("note--selected");

            exports.$.score
                .find(".note")
                .eq( index )
                .addClass("note--selected");

        };

        exports.track.playSong = function( bpm, onebeat ) {

            var timer,
                $el, 
                note, 
                length = 1000,
                regex = /♫[0-9]{1,2}/;

            bpm = bpm || 72;
            onebeat = onebeat || 4;

            var loop = function() {

                timer = setTimeout( function() {

                    $el = $(".stage__score .note").eq( app.track.selected - 1 );

                    if( $el.length ) {

                        note = parseInt( $el.attr("class").match( regex )[0].replace("♫",""), 10 );
                        length = (((60 / bpm) * onebeat) / note ) * 1000;
                        console.log( length );

                        app.playNote( $el );

                        app.track.selected += 1;
                        loop();

                    } else {

                        app.track.selected -= 1;

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

            exports.track.selected = exports.$.score.find(".note").length;

        };




        exports.track.events = function() {
            pubsub.on("selectNote", exports.track.selectNote );
        };

        exports.track.init = (function() {
            exports.track.events();
        }());

        return exports;

    } (app || {}));