    

    var app = (function(exports) {

        exports.keyboard = {};
        exports.$.keyboard = $(".input-keyboard");
        exports.$.keyboardOcarina = $(".input-area .note");
        exports.$.keyboardKeys = exports.$.keyboard.find(".key");
        
        exports.keyboard.events = function() {

            exports.$.keyboardKeys.on("mouseover.hoverKey", function(e) {
                pubsub.trigger("keyboard.hoverKey", { el: this, event: e });
            });

            exports.$.keyboardKeys.on("mouseout.hoverKey", function(e) {
                pubsub.trigger("keyboard.unhoverKey", { el: this, event: e });
            });


        };

        exports.keyboard.highlightKey = function( data ) {

            var e = data.event,
                $this = $( data.el ),
                key = $this.data("key");

            $this.addClass( "key--active" );
            exports.$.keyboardOcarina.addClass( "note--♪" + key );

        };

        exports.keyboard.dimKeys = function() {

            exports.$.keyboardKeys.removeClass( "key--active" );
            exports.$.keyboardOcarina.removeClass(function (index, css) {
                return (css.match (/(^|\s)note--♪\S+/g) || []).join(' ');
            });

        };

        exports.keyboard.pubsub = function() {

            pubsub.on("keyboard.hoverKey", function( e, data ) {
                exports.keyboard.dimKeys( data );
                exports.keyboard.highlightKey( data );
            });

            pubsub.on("keyboard.unhoverKey", function( e, data ) {
                exports.keyboard.dimKeys( data );
            });

        };

        exports.keyboard.init = (function() {

            exports.keyboard.pubsub();
            exports.keyboard.events();
            //exports.keyboard.movable();

        }());

        return exports;

    } (app || {}));