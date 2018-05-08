"use strict";

const Express = require("express");
const jsdom = require("jsdom");
const Logger = require("./logger");
const Readability = require("readability");
const request = require("request");

function ReadabilityServer() {
    var logger  = null;
    const port = process.env.PORT || 25287;

    function getArticle(reqIn, resOut) {
        var options = {
            gzip: true,
            headers: {
                "accept": "text/html,application/xhtml+xml,application/xml"
                          + ";q=0.9,*/*;q=0.8",
                "accept-language": reqIn.header("Accept-Language"),
                "cache-control": "max-age=0",
                "dnt": 1,
                "referer": reqIn.header("Referer"),
                "upgrade-insecure-requests": 1,
                "user-agent": reqIn.header("User-Agent")
            },
            jar: false,
            method: "GET",
            url: reqIn.params.url
        };

        function callback(error, resIn, body) {
            if (error) {
                // some error getting a URL
                logger.log("Error getting " + reqIn.params.url + " - "
                           + error);
                resOut.status(500).json({error: error});
            } else {
                if (resIn.statusCode == 200) {
                    // all ok, create DOM with jsdom and parse with readability
                    var dom = new jsdom.JSDOM(body);
                    var article = new Readability(dom.window.document).parse();
                    logger.log("Successfully parsed " + reqIn.params.url);
                    resOut.json(article);
                } else {
                    // non-200 response, return that to the user
                    logger.log(resIn.statusCode + " response from "
                               + reqIn.params.url + " - " + body);
                    resOut.status(resIn.statusCode).json({body: body});
                }
            }
        }

        logger.log("Parsing " + reqIn.params.url);
        request(options, callback);
    }

    function init() {
        logger = Logger();
        const app = Express();

        // remove x-powered-by property from header
        app.disable("x-powered-by");

        // this endpoint will get an article and parse it with readability
        app.get("/article/:url", getArticle);

        // TODO: add endpoint that parses a given HTML string with readability

        // launch server
        app.listen(port, function() {
            logger.log("Server launched on port " + port);
        });

        // this will print a message to the logger when shutting down
        function exitHandler(options, err) {
            if (err) logger.log(err.stack);
            if (options.showMessage) logger.log('Server shutting down');
            if (options.exit) process.exit();
        };

        process.on("exit", exitHandler.bind(null, {showMessage: true}));
        process.on("SIGINT", exitHandler.bind(null, {exit: true}));
        process.on("SIGUSR1", exitHandler.bind(null, {exit: true}));
        process.on("SIGUSR2", exitHandler.bind(null, {exit: true}));
        process.on("uncaughtException", exitHandler.bind(null, {exit: true}));
    }

    init();
}

ReadabilityServer();
