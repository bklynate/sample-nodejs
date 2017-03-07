var mysql = require('mysql');

var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : ''
    });

/*
 * Creating DB for a new shop after request
*/
exports.createSaaSDB = function(){
    connection.query('CREATE DATABASE IF NOT EXISTS shop', function (err) {
        if (err) throw err;
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
    });
};

/*
 * Creating DB for a new shop after request
*/
exports.createShopDB = function(shopname){
    connection.query('CREATE DATABASE IF NOT EXISTS ' + shopname + '', function (err) {
        if (err) throw err;
        connection.query('USE ' + shopname + '', function (err) {
            if (err) throw err;
            connection.query('CREATE TABLE IF NOT EXISTS ' + shopname + '('
                + 'id INT NOT NULL AUTO_INCREMENT,'
                + 'PRIMARY KEY(id),'
                + 'category VARCHAR(50),'
                + 'product VARCHAR(50),'
                + 'discount INT UNSIGNED DEFAULT 0'
                + 'price INT UNSIGNED DEFAULT 0'
                +  ')', function (err) {
                    if (err) throw err;
            });
        });
    });
};