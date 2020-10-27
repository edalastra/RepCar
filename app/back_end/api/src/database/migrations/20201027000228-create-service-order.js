'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('service_order', { 
        date:{
          type: Sequelize.DATE,
          primaryKey: true,
          allowNull: false,
        },
        shift: {
          type: Sequelize.STRING(5),
          primaryKey: true,
          validate: {
            isIn: [['morning', 'afternoon', 'night']],
          },
          allowNull: true,
        },
        worker_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          references: { model: 'workers', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        service_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          references: { model: 'services', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }
      
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('service_order');
  }
};
