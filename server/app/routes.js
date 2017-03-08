var express = require('express');
var app = express();
var routeFns = require('./functions/routes');

/*
 * Adding routes for the shop and creation
*/
app.route('/shop').post(routeFns.createShop);
app.route('/shops').get(routeFns.getShops);

/*
 * Adding routes for the shop products
*/
app.route('/shop/:shopid/products').get(routeFns.getProducts);
app.route('/shop/:shopid/product').post(routeFns.addProduct);
app.route('/shop/:shopid/product/:id').get(routeFns.getProduct);
app.route('/shop/:shopid/product/:id').put(routeFns.updateProduct);
app.route('/shop/:shopid/product/:id').delete(routeFns.deleteProduct);

/*
 * Invalid routes handlers
*/
app.route('/404').get(routeFns.error);
app.route('*').get(function (req, res) {
    res.redirect('/404');
});

module.exports = app;
