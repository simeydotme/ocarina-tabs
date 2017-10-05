    

    var app = (function(exports) {

        exports.inputArea = {};

        exports.inputArea.movable = function() {

            exports.$.inputArea.draggable({

                handle: exports.$.inputAreaHeader,
                containment: $("html"),
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

                    opacity: [1, 0],
                    top: [ dimensions.top, dimensions.top + 30 ],
                    left: [ dimensions.left, dimensions.left ],
                    translateZ: 0

                }, {

                    duration: 800,
                    easing: [ 500, 20 ],
                    queue: false,
                    delay: 500

                });

        };

        exports.inputArea.playpause = function() {

            if( exports.track.isPlaying ) {
                exports.track.stopSong();
                exports.$.playpause.removeClass("fa-pause");
                exports.$.playpause.addClass("fa-play");
            } else {
                exports.track.playSong();
                exports.$.playpause.removeClass("fa-play");
                exports.$.playpause.addClass("fa-pause");
            }

        };

        exports.inputArea.stop = function() {
            
            exports.track.stopSong();
            exports.$.playpause.removeClass("fa-pause");
            exports.$.playpause.addClass("fa-play");
                
        };

        exports.inputArea.stepback = function() {

            exports.inputArea.stop();

            var $notes = exports.$.score.find(".note");

            exports.track.selected = $notes.index( 0 );
            pubsub.trigger("track.selectNote");
                
        };

        exports.inputArea.save = function() {

            var song = exports.io.getSong();
            exports.io.storeSong( song );
                
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