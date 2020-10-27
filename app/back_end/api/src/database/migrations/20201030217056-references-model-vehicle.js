'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.changeColumn('vehicles', 'model_id',{
        type: Sequelize.INTEGER,
        allowNull: false,        
        references: { model: 'vehicle_models', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('vehicles', 'model_id',{
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  }
};
