var express = require('express');
var app = express();
var http = require('http').Server(app);
var routes = require('./app/routes.js');

app.use('/', routes);

http.listen(9001, function() {
    console.log('listening on *:9001');
});