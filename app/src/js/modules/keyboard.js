    

    var app = (function(exports) {

        exports.keyboard = {};

        exports.keyboard.highlightKey = function( e ) {

                var $this = $( this ),
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

        exports.keyboard.mouseover = function( e ) {

            exports.keyboard.dimKeys();
            exports.keyboard.highlightKey.call( this, e );

        };

        exports.keyboard.mouseout = function( e ) {
                
            exports.keyboard.dimKeys();

        };

        exports.keyboard.mousedown = function( e ) {

            exports.playNote( $(this).data("key") );
            exports.$.keyboardKeys.on("mouseover.mousedown", exports.keyboard.mousedownover );

        };

        exports.keyboard.mousedownover = function( e ) {

            exports.playNote( $(this).data("key") );

        };

        exports.keyboard.mouseup = function( e ) {

            exports.$.keyboardKeys.off("mouseover.mousedown");
            exports.addNote( $(this).data("key") , exports.track.selected , 4 );

        };
        
        exports.keyboard.events = function() {

            var evup = Modernizr.touch ? "touchend" : "mouseup";
            var evdown = Modernizr.touch ? "touchstart" : "mousedown";

            exports.$.keyboardKeys.on("mouseover.key", exports.keyboard.mouseover );
            exports.$.keyboardKeys.on("mouseout.key", exports.keyboard.mouseout );
            exports.$.keyboardKeys.on( evup + ".key", exports.keyboard.mouseup );
            exports.$.keyboardKeys.on( evdown + ".key", exports.keyboard.mousedown );

        };

        exports.keyboard.init = (function() {

            exports.keyboard.events();
            //exports.keyboard.movable();

        }());

        return exports;

    } (app || {}));