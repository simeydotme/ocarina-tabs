    

    var app = (function(exports) {


        exports.init = (function() {

            exports.loadFonts();

            exports.model = window.fixture || { notes: [] };
            exports._renderSong( exports.model );

        }());

        return exports;

    } (app || {}));