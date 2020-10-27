'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('states', { 
        id:{
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
        },
        name:{
          type: Sequelize.STRING,
          allowNull: true,
        },
        uf:{
          type: Sequelize.STRING(2),
          allowNull: false,
          unique: true
        }
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('states');
  }
};
