

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

                .css({

                    opacity: 0

                })

                .velocity({

                    opacity: 1

                }, {

                    delay: 300

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