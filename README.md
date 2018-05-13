Readability.js Server
=====================
This project uses Express to create a simple REST API for parsing URLs with
Mozilla's [Readability.js](https://github.com/mozilla/readability), a
standalone version of the script used to generate Reader View in Firefox. By
default, it listens on port 25287. Send a GET request to
http://example.com:25287/article/{URL-encoded-URL} to have it get and parse a
URL with Readability.js. This should return a JSON object with the outputs of
Readability.js.

License
-------
Copyright 2018 Joe Jacobs. Released under a [3-clause BSD License](LICENSE).
