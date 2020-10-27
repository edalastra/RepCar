'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('adresses', { 
        id:{
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
        },
        zipcode:{
          type: Sequelize.STRING,
          allowNull: true,
        },
        street: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        number: {
          type: Sequelize.STRING,
          allowNull: false,
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
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('adresses');
  }
};
