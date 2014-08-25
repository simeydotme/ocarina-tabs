
    var app = (function(exports) {



        exports.registerSounds = function() {

            var path = "src/audio";

            return {

                "4AN": new Howl({ urls: [ path + "/4AN.ogg", path + "/4AN.mp3"] }),
                "4AS": new Howl({ urls: [ path + "/4AS.ogg", path + "/4AS.mp3"] }),
                "4BF": new Howl({ urls: [ path + "/4BF.ogg", path + "/4BF.mp3"] }),
                "4BN": new Howl({ urls: [ path + "/4BN.ogg", path + "/4BN.mp3"] }),
                "5CN": new Howl({ urls: [ path + "/5CN.ogg", path + "/5CN.mp3"] }),
                "5CS": new Howl({ urls: [ path + "/5CS.ogg", path + "/5CS.mp3"] }),
                "5DF": new Howl({ urls: [ path + "/5DF.ogg", path + "/5DF.mp3"] }),
                "5DN": new Howl({ urls: [ path + "/5DN.ogg", path + "/5DN.mp3"] }),
                "5DS": new Howl({ urls: [ path + "/5DS.ogg", path + "/5DS.mp3"] }),
                "5EF": new Howl({ urls: [ path + "/5EF.ogg", path + "/5EF.mp3"] }),
                "5EN": new Howl({ urls: [ path + "/5EN.ogg", path + "/5EN.mp3"] }),
                "5FN": new Howl({ urls: [ path + "/5FN.ogg", path + "/5FN.mp3"] }),
                "5FS": new Howl({ urls: [ path + "/5FS.ogg", path + "/5FS.mp3"] }),
                "5GF": new Howl({ urls: [ path + "/5GF.ogg", path + "/5GF.mp3"] }),
                "5GN": new Howl({ urls: [ path + "/5GN.ogg", path + "/5GN.mp3"] }),
                "5GS": new Howl({ urls: [ path + "/5GS.ogg", path + "/5GS.mp3"] }),
                "5AF": new Howl({ urls: [ path + "/5AF.ogg", path + "/5AF.mp3"] }),
                "5AN": new Howl({ urls: [ path + "/5AN.ogg", path + "/5AN.mp3"] }),
                "5AS": new Howl({ urls: [ path + "/5AS.ogg", path + "/5AS.mp3"] }),
                "5BF": new Howl({ urls: [ path + "/5BF.ogg", path + "/5BF.mp3"] }),
                "5BN": new Howl({ urls: [ path + "/5BN.ogg", path + "/5BN.mp3"] }),
                "6CN": new Howl({ urls: [ path + "/6CN.ogg", path + "/6CN.mp3"] }),
                "6CS": new Howl({ urls: [ path + "/6CS.ogg", path + "/6CS.mp3"] }),
                "6DF": new Howl({ urls: [ path + "/6DF.ogg", path + "/6DF.mp3"] }),
                "6DN": new Howl({ urls: [ path + "/6DN.ogg", path + "/6DN.mp3"] }),
                "6DS": new Howl({ urls: [ path + "/6DS.ogg", path + "/6DS.mp3"] }),
                "6EF": new Howl({ urls: [ path + "/6EF.ogg", path + "/6EF.mp3"] }),
                "6EN": new Howl({ urls: [ path + "/6EN.ogg", path + "/6EN.mp3"] }),
                "6FN": new Howl({ urls: [ path + "/6FN.ogg", path + "/6FN.mp3"] })

            };

        };







        exports.init = (function() {

            exports.sounds = exports.registerSounds();
            exports.loadFonts();

        }());

        return exports;

    } (app || {}));