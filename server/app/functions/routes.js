'use strict';
var body = require('./commons');

/*
 * Create shop function
*/
exports.createShop = function (req, res, next) {
    var results = {}, msg = 'Success', details = 'Shop created with id';
    res.status(200).json(body.str(results, msg, details));
};

/*
 * Get products from shop function
*/
exports.getProducts = function (req, res, next) {
    var results = [], msg = 'Success', details = 'Product list of shop id';
    res.status(200).json(body.str(results, msg, details));
};

/*
 * Add product to a shop function
*/
exports.addProduct = function (req, res, next) {
    var results = {}, msg = 'Success', details = 'Product added to shop id';
    res.status(200).json(body.str(results, msg, details));
};

/*
 * Get product details from a shop function
*/
exports.getProduct = function (req, res, next) {
    var results = {}, msg = 'Success', details = 'Details of product id of shop id';
    res.status(200).json(body.str(results, msg, details));
};

/*
 * Update Product from shop function
*/
exports.updateProduct = function (req, res, next) {
    var results = '', msg = 'Success', details = 'The product id of shop id was updated';
    res.status(200).json(body.str(results, msg, details));
};

/*
 * Delete Product from shop function
*/
exports.deleteProduct = function (req, res, next) {
    var results = {}, msg = 'Success', details = 'The product id was deleted';
    res.status(status).json(body.str(results, msg, details));
};

/*
 * Error API function
*/
exports.error = function (req, res, next) {
    var status = 404, results = {}, msg = 'Error', details = 'The API requested was not found. Contact Administrator';
    res.status(status).json(body.str(results, msg, details));
};
