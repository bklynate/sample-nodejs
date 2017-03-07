'use strict';
var body = require('./commons');

/*
 * Generic Logging and Error Handling Middleware
*/
exports.middlewareGenericErrorHandler = function (err, req, res, next) {
  var results = {}, msg = 'Error', details;
  if (err) { 
    console.error(err.stack); 
    if (req.xhr) {
      details = {
        error: 'Client Request Error',
        errorStack: err.stack
      };
      res.status(500).json(body.str(results, msg, details));
    } else {
      details = {
          error: 'Application Error',
          errorStack: err.stack
      };
      res.status(500).json(body.str(results, msg, details));
    }
  }
  console.log(req);
  next();
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
