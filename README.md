# Readability.js Server

This project uses Express to create a simple REST API for parsing URLs with
Mozilla's [Readability.js][https://github.com/mozilla/readability]. By default,
it listens on port 25287. Send a GET request to
http://example.com:port/article/{URL-encoded URL} to have it get and parse a
URL with Readability.js.
