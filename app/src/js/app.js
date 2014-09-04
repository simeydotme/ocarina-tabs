    
    // pubsub with jquery! woot.
    var pubsub = $({});

    var app = (function(exports) {

        exports.templates = {};
        exports.$ = {};

        exports.$.window = $(window);
        exports.$.body = $("body");
        exports.$.title = $(".stage__title");
        exports.$.score = $(".stage__score");
        
        exports.$.keyboard = $(".input-keyboard");
        exports.$.keyboardOcarina = $(".input-area .note");
        exports.$.keyboardKeys = exports.$.keyboard.find(".key");

        exports.$.titleTemplate = $("#title-template");
        exports.$.noteTemplate = $("#note-template");

        return exports;

    } (app || {}));
