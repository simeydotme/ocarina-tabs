    

    var app = (function(exports) {

        exports.inputArea = {};
        exports.$.inputArea = $(".input-area");
        exports.$.inputAreaHeader = $(".input-header");

        exports.inputArea.movable = function() {

            exports.$.inputArea.draggable({

                handle: exports.$.inputAreaHeader,
                containment: exports.$.body,
                appendTo: exports.$.body,
                opacity: 0.6,
                create: function() { pubsub.trigger("inputArea.created"); },
                stop: function() { pubsub.trigger("inputArea.finishedDragging"); }

            });

        };

        exports.inputArea.setCoords = function() {

            var coords = {},
                json;

                coords.x = parseInt( exports.$.inputArea.css("left").replace("px","") );
                coords.y = parseInt( exports.$.inputArea.css("top").replace("px","") );

            json = JSON.stringify( coords );

            localStorage.setItem( "inputCoords", json );

        };

        exports.inputArea.getCoords = function() {

            var coords, 
                json, 
                browser,
                box,
                buffer = 30;

            json = localStorage.getItem( "inputCoords", json );
            coords = JSON.parse( json ) || { x: 9999, y: 9999 };

            browser = { 
                w: exports.$.window.width(),
                h: exports.$.window.height()
            };

            box = {
                w: exports.$.inputArea.width(),
                h: exports.$.inputArea.height()
            };

            if( browser.w < coords.x + box.w ) { 
                coords.x = browser.w - box.w - 30;
            }

            if( browser.h < coords.y + box.h ) { 
                coords.y = browser.h - box.h - 30;
            }

            exports.$.inputArea.css({ 
                left: coords.x, 
                top: coords.y 
            });

        };

        exports.inputArea.show = function() {
            exports.$.inputArea.removeClass("input-area--hidden");
        };

        exports.inputArea.pubsub = function() {

            pubsub.on("inputArea.created", exports.inputArea.getCoords );
            pubsub.on("inputArea.created", exports.inputArea.show );
            pubsub.on("inputArea.finishedDragging", exports.inputArea.setCoords );

        };

        exports.inputArea.init = (function() {

            exports.inputArea.pubsub();
            exports.inputArea.movable();

        }());

        return exports;

    } (app || {}));