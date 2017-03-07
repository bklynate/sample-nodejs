var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var routes = require('./app/routes.js');
var md = require('./app/functions/middlewares');

/*
 * Adding middlewares for parsing JSON Body
*/      
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json()); 
app.use(methodOverride());

/*
 * Handling generic errors in application
 * Applying middlewares
 * Applying routes
*/
app.use('/', md.middlewareGenericErrorHandler, md.middlewareSetHeaders, routes);

http.listen(9001, function() {
    console.log('listening on *:9001');
});