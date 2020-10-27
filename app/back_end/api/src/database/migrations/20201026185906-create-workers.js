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
        CLT: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            isNumeric: true,
          },
        },
        PIS: {
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
        hourValue: {
          type: Sequelize.DOUBLE,
          allowNull: false,
        },
        admission: {
          type: Sequelize.DATE,
          allowNull: false,
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
      return queryInterface.dropTable('workers');
  }
};
