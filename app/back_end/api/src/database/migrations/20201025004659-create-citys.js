'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('citys', { 
        id:{
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
        },
        name:{
          type: Sequelize.STRING,
          allowNull: true,
        },
        state_id:{
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('citys');
  }
};
