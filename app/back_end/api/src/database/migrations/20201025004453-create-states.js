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
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        created_at: {
          type: Sequelize.DATE,
        },
        updated_at: {
          type: Sequelize.DATE,
        },
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('states');
  }
};
