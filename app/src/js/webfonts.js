
    var app = (function(exports) {

        exports.loadFonts = function() {

            WebFontConfig = {
                google: {
                    families: ["Lato"]
                }
            };

            (function() {
                var wf = document.createElement("script");
                wf.src = ("https:" == document.location.protocol ? "https" : "http") +
                "://ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js";
                wf.type = "text/javascript";
                wf.async = "true";
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(wf, s);
            })();

        };

        return exports;

    } (app || {}));