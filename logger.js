"use strict";

const fs = require("fs");

function Logger() {
    var logfile = process.env.LOGFILE || null;

    return {
        log:function(message) {
            // add timestamp to message
            message = "[" + new Date().toISOString() + "] " + message;

            if (logfile) {
                // append to logfile
                return fs.appendFileSync(logfile, message + "\n");
            }

            // output to console
            return console.log(message);
        }
    };
}

module.exports = Logger;
