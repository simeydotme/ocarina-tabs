

    var app = (function(exports) {

        var _handlebarsHelpers = (function() {

            Handlebars.registerHelper("noteName", function( note ) {
                return note.split("")[1];
            });

        }());



        return exports;

    } (app || {}));