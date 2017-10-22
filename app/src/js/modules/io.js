

    var app = (function(exports) {

        exports.io = {};
        
        var reader = new FileReader();
        
        reader.onload = function(e) {
            exports.io.loadSong( decodeURIComponent( e.target.result ) );
        };

        exports.io.getSong = function() {

            var notes = exports.track.createNotesModel();
            var meta = exports.track.createTitleModel();

            var song = {

                title: meta.title,
                subtitle: meta.subtitle,
                author: meta.author,
                bpm: meta.bpm,
                notes: notes

            };

            return song;

        };

        exports.io.getSongJSON = function() {

            var song = exports.io.getSong();
            return JSON.stringify( song );

        };

        exports.io.saveSong = function() {

            var title = exports.io.getSong().title,
                songJSON = encodeURIComponent( exports.io.getSongJSON() ),
                $link = $("#download"),
                exists = $link.length > 0;

            if ( !exists ) {
                $link = $("<a id='download' />");
            }

            $link
                .text( "download" )
                .attr( "download", title + ".ocrna" )
                .attr( "href", "data:application/octet-stream," + songJSON );

            if ( !exists ) {

                $("body").append( $link );

            }

            $link[0].click();

            return songJSON;

        };

        /**
         * store the song to local storage
         * @param {string} songJSON - a json string containing the title/author/notes
         * @return {string} song - json string of the song 
         */
        exports.io.storeSong = function( songJSON ) {
            
            var song;
            
            if ( songJSON && typeof songJSON === "string" ) {

                song = songJSON;

            } else {

                song = exports.io.getSongJSON();

            }

            localStorage.setItem( "storedSong", song );
            console.log( "storing current composition to local storage" );

            return song;

        };

        /**
         * load the song from a json string
         * @param {string} songJSON - json string of the song to load
         * @return {string} songJSON
         */
        exports.io.loadSong = function( songJSON ) {
            
            if ( !songJSON ) {

                console.warn( "Cannot load song as there is no supplied json string" );
                return;

            }

            if ( typeof songJSON === "string" ) {
                songJSON = JSON.parse( songJSON );
            }

            exports.model = songJSON;
            exports._renderSong( songJSON );

            return songJSON;

        }

        exports.io.uploadFile = function() {

            try {

                reader.readAsText( exports.$.upload[0].files[0] );

            } catch(error) {

                console.error( error );

            }

        }

        return exports;

    } (app || {}));