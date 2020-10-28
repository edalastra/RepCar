'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.changeColumn('service_order', 'worker_id',{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: { model: 'workers', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('cities', 'state_id',{
      type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
    });
  }
};

