    
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
        
        exports.$.piano = $(".input-piano");
        exports.$.pianoOcarina = $(".input-area .note");
        exports.$.pianoKeys = exports.$.piano.find(".key");

        exports.$.titleTemplate = $("#title-template");
        exports.$.noteTemplate = $("#note-template");

        return exports;

    } (app || {}));
