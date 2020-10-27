'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('services', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        notes: {
          type: Sequelize.TEXT
        },
        vehicle_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'vehicles', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
       });
  },
  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('services');
  }
};
