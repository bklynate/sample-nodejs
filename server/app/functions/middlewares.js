'use strict';
var body = require('./commons');

/*
 * Application's Error Logging Middleware
*/
exports.middlewareErrorLogging = function logErrors (err, req, res, next) {
  next(err);
}

/*
 * Client Request Error Handling Middleware
*/
exports.middlewareClientErrorHandler = function (err, req, res, next) {
  if (req.xhr) {
    console.error(err.stack);
    var results = {}, msg = 'Error', details = err.stack;
    res.status(500).json(body.str(results, msg, details));
  } else {
      next(err);
  }
};

/*
 * Generic Error Handling Middleware
*/
exports.middlewareGenericErrorHandler = function (err, req, res, next) {
  var results = {}, msg = 'Error', details = err.stack;
  console.error(err.stack);
  res.status(500).json(body.str(results, msg, details));
};

/*
 * Common Headers for cross domain requests and methods
*/
exports.middlewareSetHeaders = function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', false);
    next();
};
