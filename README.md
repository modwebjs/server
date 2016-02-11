# modweb-server

Server that takes care of cookies, compression, etc. Everything but the modweb site object.

## Examples

You can run `modweb-server` in the directory containing `site.js`.

You can run `modweb-server /path/to/site.js` in any directory.

You can use the exposed server like this:

```javascript
var Server = require("modweb-server");

// load site.json
var site = require("./site");

// start server
var server = new Server(site);
server.start();
```

## License

MIT
