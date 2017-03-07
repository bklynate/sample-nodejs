var mysql = require('mysql');
var conn = require('./connection').connectionObj;
var connection = mysql.createConnection({
    host: conn.host,
    user: conn.user,
    password: conn.password
});

/*
 * Creating DB for a new shop after request
*/
exports.createSaaSDB = function () {
    return new Promise(function (resolve, reject) {

        connection.query('CREATE DATABASE IF NOT EXISTS shop', function (err) {

            if (err) {
                reject({status: 'Error'});
            } 
            resolve({status: 'Success'});

            // Conflicting with Sequelize
            /*
            connection.query('USE shop', function (err) {
                if (err) throw err;
                connection.query('CREATE TABLE IF NOT EXISTS shop('
                    + 'id INT NOT NULL AUTO_INCREMENT,'
                    + 'PRIMARY KEY(id),'
                    + 'shop_name VARCHAR(50),'
                    + 'db_name VARCHAR(50),'
                    + 'requests BIGINT UNSIGNED DEFAULT 0'
                    +  ')', function (err) {
                        if (err) throw err;
                });
            });
            */

        });

    });

};

/*
 * Creating DB for a new shop after request
*/
exports.createShopDB = function(shopName){
    return new Promise(function (resolve, reject) {
        connection.query('CREATE DATABASE IF NOT EXISTS ' + shopName + '', function (err) {
            if(err) {
                resolve({status: 'Error'});
            }
            // Conflicting with sequelize
            connection.query('USE ' + shopName + '', function (err2) {
                if(err2) {
                    resolve({status: 'Error'});
                }
                connection.query('CREATE TABLE IF NOT EXISTS ' + shopName + '('
                    + 'id INT NOT NULL AUTO_INCREMENT,'
                    + 'PRIMARY KEY(id),'
                    + 'category VARCHAR(50),'
                    + 'product VARCHAR(50),'
                    + 'discount INT UNSIGNED DEFAULT 0,'
                    + 'price INT UNSIGNED DEFAULT 0'
                    +  ')', function (err3) {
                        
                        if(err3) {
                            resolve({status: 'Error'});
                        }
                        resolve({status: 'Success'})
                });
            });
            
        });
    });
};