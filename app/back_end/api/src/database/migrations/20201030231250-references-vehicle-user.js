'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.changeColumn('vehicles', 'owner_id',{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('vehicles', 'owner_id',{
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  }
};

