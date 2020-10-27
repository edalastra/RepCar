'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.changeColumn('adresses', 'city_id',{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'citys', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('adresses', 'city_id',{
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  }
};

