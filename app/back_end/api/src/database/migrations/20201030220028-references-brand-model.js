'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.changeColumn('vehicle_models', 'brand_id',{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'vehicle_brands', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('vehicle_models', 'brand_id',{
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  }
};

