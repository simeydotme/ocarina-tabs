    

    var app = (function(exports) {

        exports.noteLengths = [ 1, 2, 4, 8, 16, 32 ];

        exports.noteNames = {

            1: "breve",
            2: "semibreve",
            4: "crotchet",
            8: "quaver",
            16: "semiquaver",
            32: "demisemiquaver"

        };

        exports.registerSounds = function( type ) {

            var path = "src/audio/ocarina",
                preload = true,
                autoplay = false,
                startTimes = {},
                notes;

            if( type === "piano" ) {

                path = "src/audio/piano";

                startTimes = {

                    "4AN": 0.80,
                    "4AS": 0.31,
                    "4BF": 0.31,
                    "4BN": 0.64,
                    "5CN": 0.62,
                    "5CS": 0.60,
                    "5DF": 0.60,
                    "5DN": 0.74,
                    "5DS": 0.60,
                    "5EF": 0.60,
                    "5EN": 0.76,
                    "5FN": 0.64,
                    "5FS": 0.42,
                    "5GF": 0.42,
                    "5GN": 0.70,
                    "5GS": 0.60,
                    "5AF": 0.60,
                    "5AN": 0.30,
                    "5AS": 0.50,
                    "5BF": 0.50,
                    "5BN": 0.55,
                    "6CN": 0.27,
                    "6CS": 0.70,
                    "6DF": 0.70,
                    "6DN": 0.42,
                    "6DS": 0.70,
                    "6EF": 0.70,
                    "6EN": 0.70,
                    "6FN": 0.80
                };

            }

            notes = {

                "4AN": new buzz.sound( path + "/4AN", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                "4AS": new buzz.sound( path + "/4AS", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                "4BF": new buzz.sound( path + "/4BF", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                "4BN": new buzz.sound( path + "/4BN", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                "5CN": new buzz.sound( path + "/5CN", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                "5CS": new buzz.sound( path + "/5CS", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                "5DF": new buzz.sound( path + "/5DF", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                "5DN": new buzz.sound( path + "/5DN", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                "5DS": new buzz.sound( path + "/5DS", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                "5EF": new buzz.sound( path + "/5EF", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                "5EN": new buzz.sound( path + "/5EN", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                "5FN": new buzz.sound( path + "/5FN", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                "5FS": new buzz.sound( path + "/5FS", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                "5GF": new buzz.sound( path + "/5GF", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                "5GN": new buzz.sound( path + "/5GN", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                "5GS": new buzz.sound( path + "/5GS", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                "5AF": new buzz.sound( path + "/5AF", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                "5AN": new buzz.sound( path + "/5AN", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                "5AS": new buzz.sound( path + "/5AS", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                "5BF": new buzz.sound( path + "/5BF", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                "5BN": new buzz.sound( path + "/5BN", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                "6CN": new buzz.sound( path + "/6CN", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                "6CS": new buzz.sound( path + "/6CS", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                "6DF": new buzz.sound( path + "/6DF", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                "6DN": new buzz.sound( path + "/6DN", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                "6DS": new buzz.sound( path + "/6DS", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                "6EF": new buzz.sound( path + "/6EF", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                "6EN": new buzz.sound( path + "/6EN", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),
                "6FN": new buzz.sound( path + "/6FN", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay }),

                // pause needs to play, to keep time.
                // but it should not be heard.
                "PAUSE": new buzz.sound( path + "/5CN", { formats: [ "ogg", "mp3" ], preload: preload, autoplay: autoplay, volume: 0 }),

                "startTimes": startTimes

            };

            return notes;

        };

        exports.notes = exports.registerSounds("piano");
        return exports;

    } (app || {}));