'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('vehicle_brands', 
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
          
        });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('vehicle_brands');
    }
};
