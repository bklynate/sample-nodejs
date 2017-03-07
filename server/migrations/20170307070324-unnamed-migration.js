'use strict';
var mysql = require('mysql');

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('shop', {
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
          type: Sequelize.INTEGER,
          allowNull:    false,
          defaultValue: 0
        }
      }, {
        engine: 'MYISAM',                     // default: 'InnoDB'
        charset: 'latin1',                    // default: null
    });
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.dropTable('shop');
  }
};
