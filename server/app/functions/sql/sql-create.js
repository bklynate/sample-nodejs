var mysql = require('mysql');
var conn = require('./connection').connectionObj;
var connObj = function (conn) {
    return mysql.createConnection({
        host: conn.host,
        user: conn.user,
        password: conn.password
    })
};

/*
 * Creating DB for a new shop after request
*/
exports.createSaaSDB = function () {
    return new Promise(function (resolve, reject) {
        var connection = connObj(conn);
        connection.query('CREATE DATABASE IF NOT EXISTS shop', function (err) {
            if (err) {
                resolve({status: 'Error'});
            } 
            resolve({status: 'Success'});
            connection.end();
        });

    });

};

/*
 * Creating DB for a new shop after request
*/
exports.createShopDB = function(shopName){

    var connection = connObj(conn);
    return new Promise(function (resolve, reject) {
        connection.query('CREATE DATABASE IF NOT EXISTS ' + shopName + '', function (err) {
            if (err) {
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
                        resolve({status: 'Success'});
                        connection.end();
                });
            });

        });

    });

};