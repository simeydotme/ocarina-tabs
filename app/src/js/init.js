    

    var app = (function(exports) {


        exports.$.score.on("mouseup", ".note", function(e) {

            pubsub.trigger("playNote", this );

        });


        exports.init = (function() {

            exports.loadFonts();

            exports.model = window.fixture || { notes: [] };
            exports._renderSong( exports.model );

        }());

        return exports;

    } (app || {}));