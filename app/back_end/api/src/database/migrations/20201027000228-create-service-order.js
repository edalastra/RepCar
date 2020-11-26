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
        shift: {
          type: Sequelize.STRING,
          validate: {
            isIn: [['morning', 'afternoon', 'night']],
          },
          allowNull: true,
        },
        worker_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        service_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
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
