Readability.js Server
=====================
This project uses [Express](https://expressjs.com/) to create a simple REST API
for parsing URLs with [Readability.js](https://github.com/mozilla/readability),
a standalone version of the script used to generate Reader View in Firefox. By
default, it listens on port 25287. Send a GET request to
http://example.com:25287/article/{percent-encoded-URL} to have it get and parse
a URL with Readability.js. This should return a JSON object with the outputs of
Readability.js.

License
-------
Copyright (C) 2018-2019 Joe Jacobs. All rights reserved.

This program is free software: you can redistribute it and/or modify it under
the terms of the GNU Affero General Public License as published by the Free
Software Foundation, either version 3 of the License, or (at your option) any
later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along
with this program. If not, see <https://www.gnu.org/licenses/>.

