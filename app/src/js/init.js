    

    var app = (function(exports) {

        var introTune = function() {

            setTimeout( function() {

                var speed = 130;
                app.playNote("5AN");
                setTimeout(function(){ app.playNote("5GS"); },speed);
                setTimeout(function(){ app.playNote("5DS"); },speed*2);
                setTimeout(function(){ app.playNote("4BN"); },speed*3);
                setTimeout(function(){ app.playNote("4AS"); },speed*4);
                setTimeout(function(){ app.playNote("5DN"); },speed*5);
                setTimeout(function(){ app.playNote("5FS"); },speed*6);
                setTimeout(function(){ app.playNote("6CN"); },speed*7);

            }, 1000 );

        };

        exports.init = (function() {

            exports.model = window.fixture || { notes: [] };

            exports.loadFonts();
            exports._renderSong( exports.model );
            
            //introTune();

        }());

        return exports;

    } (app || {}));