    

    var app = (function(exports) {

        exports.templates = {};

        exports.$.titleTemplate = $("#title-template");
        exports.$.noteTemplate = $("#note-template");

        exports.templates.title = Handlebars.compile( exports.$.titleTemplate.html() );
        exports.templates.note = Handlebars.compile( exports.$.noteTemplate.html() );

        return exports;

    } (app || {}));