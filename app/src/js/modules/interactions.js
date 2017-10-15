

    var app = (function(exports) {

        exports.interactions = {};

        exports.interactions.events = function() {


            var evup = Modernizr.touch ? "touchend" : "mouseup",
                evdown = Modernizr.touch ? "touchstart" : "mousedown";


            exports.$.score.on( evup + ".note", ".note", exports.note.handleMouseup );

            exports.$.doc.on("keyup.note", exports.note.handleKeyup );
            exports.$.doc.on("keydown.note", exports.note.handleKeydown );

            exports.$.pianoKeys.on("mouseover.key", exports.piano.mouseover );
            exports.$.pianoKeys.on("mouseout.key", exports.piano.mouseout );
            exports.$.pianoKeys.on( evup + ".key", exports.piano.mouseup );
            exports.$.pianoKeys.on( evdown + ".key", exports.piano.mousedown );


            exports.$.playpause.on( evup + ".playpause", exports.inputArea.playpause );
            exports.$.stop.on( evup + ".stop", exports.inputArea.stop );
            exports.$.stepback.on( evup + ".stepback", exports.inputArea.stepback );
            exports.$.save.on( evup + ".save", exports.inputArea.save );

            exports.$.upload.on( "change.upload", exports.io.uploadFile );

        };


        exports.interactions.init = (function() {

            exports.interactions.events();

        }());

        return exports;

    } (app || {}));