    

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