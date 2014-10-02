

    var app = (function(exports) {

        var _handlebarsHelpers = (function() {

            Handlebars.registerHelper("noteName", function( note ) {
                return note.split("")[1];
            });

        }());


        exports._keymap = {

        	backspace: 8,
        	delete: 46,
        	tab: 9,
        	enter: 13,
        	space: 32,
        	left: 37,
        	right: 39,
        	up: 38,
        	down: 40,

        };


        return exports;

    } (app || {}));