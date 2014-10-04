    

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

        /**
         * Get the Dimensions that the input area/piano should be at
         * @return {object} object with the left/top coords and width/height
         */
        exports.inputArea.getDimensions = function() {

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

            return {

                left: coords.x, 
                top: coords.y,
                width: box.w,
                height: box.h

            };

        };

        exports.inputArea.show = function() {

            var $area = exports.$.inputArea,
                dimensions = exports.inputArea.getDimensions();

            $area

                .velocity({

                    opacity: 0,
                    top: dimensions.top + 100,
                    left: dimensions.left

                }, 0)

                .velocity({

                    opacity: 1

                }, {

                    duration: 700,
                    delay: 100,
                    easing: "swing",
                    queue: false

                })

                .velocity({

                    top: dimensions.top

                }, {

                    duration: 800,
                    delay: 200,
                    easing: [ 1200, 40 ],
                    queue: false

                });

        };

        exports.inputArea.pubsub = function() {

            pubsub.on("inputArea.created", exports.inputArea.show );
            pubsub.on("inputArea.finishedDragging", exports.inputArea.setCoords );

        };

        exports.inputArea.init = (function() {

            exports.inputArea.pubsub();
            exports.inputArea.movable();

        }());

        return exports;

    } (app || {}));