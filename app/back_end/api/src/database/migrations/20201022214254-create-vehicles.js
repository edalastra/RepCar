'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('vehicles', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        model_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'vehicle_models', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT',
        },
        plate: {
          type: Sequelize.STRING(7),
          allowNull: false
        },
        year: {
          type: Sequelize.STRING(4)
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
      return queryInterface.dropTable('vehicles');
  }
};
