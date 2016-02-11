var bodyParser = require("body-parser");
var compression = require("compression");
var clone = require("clone");
var connect = require("connect");
var Modweb = require("modweb-middleware");
var http = require("http");
var st = require("st");

var jade = require("jade-runtime");

function ServerFactory(site) {
	var keys = Object.keys(site.views);
	for (var i = 0; i < keys.length; i++) {
		site.views[keys[i]] = { render: new Function("jade", "return " + site.views[keys[i]].client)(jade) };
	}
	console.log(site.views);

	var app = connect();

	app.config = site.config;

	// gzip/deflate outgoing responses
	app.use(compression());

	// parse urlencoded request bodies into req.body
	app.use(bodyParser.urlencoded());

	// setup modweb
	var modweb = new Modweb(site);
	app.use(modweb);

	if (site.config.files) {
		var files = clone(site.config.files);
		files.passthrough = true;
		files.gzip = false;
		app.use(st(files));
	}

	// handle 404
	//app.use(modweb);

	return app;
}

module.exports = ServerFactory;
