var Sequelize = require('sequelize');
var connectionObj = require('./connection').connectionObj;
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

var sequelizeShop = seqFunction('shop', connectionObj);
var Shop = sequelizeShop.define('shops', {
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
});

var sequelize = {};
Shop.sync().then(function(){
    Shop.findAll().then(function(shops){
        console.log(shops);
        for(var i=0;i<shops.length;i++ ){
            sequelize[shops[i].db_name] = seqFunction(shops[i].db_name, connectionObj);
        }
    });
});


for (var key in sequelize) {
  if (sequelize.hasOwnProperty(key)) {
    sequelize[key].authenticate()
        .then(function (err) {
            if(err) throw err;
            console.log('Connection has been established successfully.');
        });
  }
};

