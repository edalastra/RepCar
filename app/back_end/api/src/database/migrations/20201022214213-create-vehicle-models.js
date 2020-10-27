'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('vehicle_models', 
        { 
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
          },
          name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          brand_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
        });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('vehicle_models');
    }
};