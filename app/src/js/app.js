    
    // pubsub with jquery! woot.
    var pubsub = $({});

    var app = (function(exports) {

        exports.templates = {};
        exports.$ = {};

        exports.$.window = $(window);
        exports.$.body = $("body");




        return exports;

    } (app || {}));
