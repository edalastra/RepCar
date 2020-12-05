'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('order_services', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        date:{
          type: Sequelize.DATEONLY,
          allowNull: false,
        },
        worker_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        vehicle_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'vehicles', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        service_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          },
        status: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            isIn: ['pending', 'finished', 'canceled']
          }
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE
        }
      
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('order_services', {cascade: true});
  }
};
