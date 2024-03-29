'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('workers', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        clt: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            isNumeric: true,
          },
        },
        pis: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            isNumeric: true,
          },
        },
        genre: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            isIn: [['M','F']]
          },
        },
        hour_value: {
          type: Sequelize.DOUBLE,
          allowNull: false,
        },
        admission: {
          type: Sequelize.DATEONLY,
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        admin: {
          type: Sequelize.BOOLEAN,
          default: 'false',
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('workers');
  }
};
