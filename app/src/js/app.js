    
    // pubsub with jquery! woot.
    var pubsub = $({});

    var app = (function(exports) {

        exports.templates = {};
        exports.$ = {};

        exports.$.doc = $(document);
        exports.$.window = $(window);
        exports.$.body = $("body");

        exports.$.title = $(".stage__title");
        exports.$.score = $(".stage__score");
        
        exports.$.inputArea = $(".input-area");
        exports.$.inputAreaHeader = $(".input-header");

        exports.$.piano = $(".input-piano");
        exports.$.pianoOcarina = $(".input-area .note");
        exports.$.pianoKeys = exports.$.piano.find(".key");

        exports.$.playpause = $(".input-header__icon--playpause");
        exports.$.stop = $(".input-header__icon--stop");
        exports.$.stepback = $(".input-header__icon--stepback");
        exports.$.save = $(".input-header__icon--save");

        exports.$.dialog = $(".song-dialog");
        exports.$.textbox = $("#song-text");
        

        exports.$.titleTemplate = $("#title-template");
        exports.$.noteTemplate = $("#note-template");

        return exports;

    } (app || {}));
