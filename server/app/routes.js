var express = require('express');
var app = express();
var routeFns = require('./functions/routes');
var md = require('./functions/middlewares');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

/*
 * Adding middlewares for parsing JSON Body
*/      
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json()); 
app.use(methodOverride());

/*
 * Handling response headers in application
*/
app.use(md.middlewareSetHeaders);

/*
 * Handling logging and generic errors in application
*/
app.use(md.middlewareGenericErrorHandler);

/*
 * Adding routes for the shop creation
*/
app.route('/shop').post(routeFns.createShop);

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
app.route('*')
    .get(function(req, res) {
        res.redirect('/404');
});

module.exports = app;
