    

    var app = (function(exports) {

        exports.inputArea = {};
        exports.$.inputArea = $(".input-area");
        exports.$.inputAreaHeader = $(".input-header");

        exports.inputArea.movable = function() {

            exports.$.inputArea.draggable({

                handle: exports.$.inputAreaHeader,
                containment: $("body")

            });

        };



        exports.inputArea.init = (function() {

            exports.inputArea.movable();

        }());

        return exports;

    } (app || {}));