'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('addresses', { 
        id:{
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        zipcode:{
          type: Sequelize.STRING,
          allowNull: true,
          validate: {
            isNumber: true,
          },
        },
        street: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        number: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            isNumber: true,
          },
        },
        complement: {
          type: Sequelize.STRING
        },
        neighborhood: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        city_id:{
          type: Sequelize.INTEGER,
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
      return queryInterface.dropTable('adresses');
  }
};
