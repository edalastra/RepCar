'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('vehicles', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        model_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        owner_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        plate: {
          type: Sequelize.STRING(7),
          allowNull: false,
          validate: {
            id: '^[a-zA-Z]{3}[0-9][A-Za-z0-9][0-9]{2}$'
          }
        },
        year: {
          type: Sequelize.STRING(4),
          validate: {
            isNumeric: true,
            min: '1950',
          }
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('vehicles');
  }
};
