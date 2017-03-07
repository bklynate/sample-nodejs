var mysql = require('mysql');

exports.create = function(){
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : ''
    });
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
}
