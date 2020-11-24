'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.changeColumn('order_services', 'service_id',{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'services', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('order_services', 'service_id',{
      type: Sequelize.INTEGER,
        allowNull: false,
    });
  }
};

