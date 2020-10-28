'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('service_order', { 
        date:{
          type: Sequelize.DATEONLY,
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
        },
        service_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        }
      
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('service_order');
  }
};
