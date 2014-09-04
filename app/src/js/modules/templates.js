    

    var app = (function(exports) {

        exports.templates = {};

        exports.templates.title = Handlebars.compile( exports.$.titleTemplate.html() );
        exports.templates.note = Handlebars.compile( exports.$.noteTemplate.html() );

        return exports;

    } (app || {}));