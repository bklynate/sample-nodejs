'use strict';
var body = require('./commons');
var sql = require('./sql/sequelize-models');
/*
 * Create shop function
*/
exports.createShop = function (req, res, next) {

    var results = {}, msg = 'Failed', details = 'Shop could not be created with id';
    
    sql.createShop(req.body).then(function(message){

        if(message && message.status === 'Success'){
            msg = message.status;
            details = 'Shop created. Please continue.';
            res.status(200).json(body.str(results, msg, details));
        } else {
            res.status(200).json(body.str(results, msg, details));
        }

    });

};

/*
 * Get products from shop function
*/
exports.getProducts = function (req, res, next) {

    var results = [], msg = 'Failed', details = 'Product list of shop id could not be fetched';

    sql.findAll(req.params.shopid).then(function (products) {

        if (!products) {
            msg = 'Error';
            res.status(403).json(body.str(results, msg, details));
        }

        msg = "Success";
        details = 'Product lists of shop id fetched';
        results = products;
        res.status(200).json(body.str(results, msg, details));
    
    });

};

/*
 * Add product to a shop function
*/
exports.addProduct = function (req, res, next) {

    var results = {}, msg = 'Failed', details = '';
    sql.createProduct(req.params.shopid, req.body).then(function (product) {

            msg = 'Success';
            details = "Product added to shop id";
            res.status(200).json(body.str(results, msg, details));

    });
    
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

    var results = {}, msg = 'Failed', details = 'Product could not be updated';
    sql.updateProduct(req.params.shopid, req.params.id, req.body).then(function(metadata){
        if (metadata.status !== 'Error' && metadata.status > 0) {
            msg = 'Success';
            details = 'The product of shop id was updated - numbers ' + metadata.status;
            res.status(200).json(body.str(results, msg, details));
        } else {
            msg = 'Error';
            res.status(500).json(body.str(results, msg, details));
        }
        
    });

};

/*
 * Delete Product from shop function
*/
exports.deleteProduct = function (req, res, next) {

    var results = {}, msg = 'Failed', details = 'The product id was deleted';
    sql.deleteProduct(req.params.shopid, req.params.id).then(function () {
        msg = 'Success';
        res.status(200).json(body.str(results, msg, details));
    });

};

/*
 * Error API function
*/
exports.error = function (req, res, next) {

    var status = 404, results = {}, msg = 'Error', details = 'The API requested was not found. Contact Administrator';
    res.status(status).json(body.str(results, msg, details));

};
