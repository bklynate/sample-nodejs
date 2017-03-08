var Sequelize = require('sequelize');
var connectionObj = require('../sql/connection').connectionObj;
var shopProductsDBSQL = require('../sql/sql-create').createShopDB;
var mysqlCreate = require("../sql/sql-create");

/*
 * New Sequelize connection string
*/
var seqFunction = function (database, conn) {
    return new Sequelize(database, conn.user, conn.password, {
        host: conn.host,
        port: conn.port,
        dialect: 'mysql',
        pool: {
            max: 1,
            min: 0,
            idle: 10000
        }
    });
};

/*
 * Sequelize options
*/
var constTableDefOptions = {
    timestamps: false,
    createdAt: false,
    updatedAt: false
}

/*
 * Common sequelize product table model
*/
var constProductsTable = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false
    },
    product: {
        type: Sequelize.STRING,
        allowNull: false
    },
    discount: {
        type: Sequelize.INTEGER,
        allowNull:    false,
        defaultValue: 0
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull:    false,
        defaultValue: 0
    }
};

var Shop, sequelizeShop, sequelize = {}, MyShopModels = {};

/*
 * Creating saas database if not present
*/
mysqlCreate.createSaaSDB().then(function (message) {

    if (message.status === 'Success') {

        sequelizeShop = seqFunction('shop', connectionObj);
        Shop = sequelizeShop.define('shops', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            shop_name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            db_name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            requests: {
                type: Sequelize.BIGINT,
                allowNull:    false,
                defaultValue: 0
            }
        }, constTableDefOptions);

        Shop.sync().then(function(){

                Shop.findAll().then(function (shops) {

                    for (var i = 0; i < shops.length; i++) {
                        sequelize[shops[i].db_name] = seqFunction(shops[i].db_name, connectionObj);
                        MyShopModels[shops[i].db_name] = sequelize[shops[i].db_name].define(shops[i].db_name, constProductsTable, constTableDefOptions);
                    }

                });

        });

    };
    
});

/*
 * Testing DB autntication
*/
for (var key in sequelize) {

  if (sequelize.hasOwnProperty(key)) {
    sequelize[key].authenticate()
        .then(function (err) {
            if(err) throw err;
            console.log('Connection has been established successfully.');
        });
  }

};

/*
 * Independent Function to create shop's product database to `shop` DB
*/
var createShopProductsDB = function (shopName) {

    return new Promise(function (resolve, reject) {

        shopProductsDBSQL(shopName).then(function (message) {
            resolve(message);
        });

    });

};

/*
 * API related Function to create shop's product database along with entry to `shop` DB
*/
exports.createShop = function (shopDetails) {
    return new Promise(function (resolve, reject) {

        Shop.findOrCreate({
            where: {db_name: shopDetails.db_name}, 
            defaults: shopDetails
        })
        .spread(function(shop, created) {
            createShopProductsDB(shopDetails.db_name).then(function (message) {
                resolve(message);
            });
        });

    });

};

/*
 * Create a new product listing in the shop's product table using details from the user
*/
exports.createProduct = function (shopId, productDetails) {

    return new Promise(function(resolve, reject){
        
        Shop.findById(shopId).then(function(shop){

            MyShopModels[shop.db_name].create(productDetails)
            .then(function() {
                resolve();
            });

        });

    });

};

/*
 * Find all products from the specific shop's product table
*/
exports.findAll = function (shopId) {

    return new Promise(function (resolve, reject){

        Shop.findById(shopId).then(function (shop) {
            MyShopModels[shop.db_name].findAll().then(function (products) {
                resolve(products);
            });
        });

    });

};

/*
 * Update a product detail from the user in the shop's product table
*/
exports.updateProduct = function (shopId, productId, productDetails) {

    return new Promise(function (resolve, reject){

        Shop.findById(shopId).then(function (shop) {
            MyShopModels[shop.db_name].update(productDetails, {
                where: {
                    id: {
                        $eq: shopId
                    }
                }
            }).then(function (results, metadata) {
                if(results){
                    resolve({status: results});
                }else{
                    resolve({status: 'Error'});
                };
            });
        });
        
    });

};

/*
 * Delete product from specific shop's table
*/
exports.deleteProduct = function (shopId, productId) {

    return new Promise(function (resolve, reject){

        Shop.findById(shopId).then(function (shop) {
            MyShopModels[shop.db_name].destroy({
                    where: {
                        id: productId
                    }
                }).then(function () {
                    resolve();
                });
        });

    });

};