#!/usr/bin/env node
var http = require("http");
var Server = require("../");

var site = require("./site");

var server = new Server(site);

var app = http.createServer(server);

app.listen(site.config.network);
