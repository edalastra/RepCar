'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.changeColumn('citys', 'state_id',{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'states', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('citys', 'state_id',{
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  }
};

