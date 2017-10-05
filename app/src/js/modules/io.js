

    var app = (function(exports) {

        exports.io = {};

        exports.io.getSong = function() {

            var notes = exports.track.createNotesModel();
            var title = exports.track.createTitleModel();

            var song = {

                title: title.title,
                subtitle: title.subtitle,
                author: title.author,
                notes: notes

            };

            return JSON.stringify( song );

        };

        exports.io.saveSong = function() {

            var song = exports.io.getSong();

            exports.$.textbox.val( song );
            exports.$.dialog.dialog();
            return song;

        };

        /**
         * store the song to local storage
         * @param {object} songData - the object containing the title/author/notes
         * @return {string} song - json string of the song 
         */
        exports.io.storeSong = function( songData ) {
            
            var song;
            
            if ( songData && typeof songData === "object" ) {

                song = songData;

            } else {

                song = exports.io.getSong();

            }

            localStorage.setItem( "storedSong", song );
            console.log( "storing current composition to local storage" );

            return song;

        };

        exports.io.loadSong = function( jsonString ) {
            
            if ( !jsonString ) {

                console.warn( "Cannot load song as there is no supplied json string" );
                return;

            }

            if ( typeof jsonString === "string" ) {
                jsonString = JSON.parse( jsonString );
            }

            exports.model = jsonString;
            exports._renderSong( jsonString );

        }

        return exports;

    } (app || {}));