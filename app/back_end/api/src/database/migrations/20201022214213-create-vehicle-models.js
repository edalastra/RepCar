'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('vehicle_models', 
        { 
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
          },
          name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          brand_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: { model: 'vehicle_brands', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
          },
          created_at: {
            type: Sequelize.DATE,
            allowNull: false
          },
          updated_at: {
            type: Sequelize.DATE,
            allowNull: false,
          },
        });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('vehicle_models');
    }
};