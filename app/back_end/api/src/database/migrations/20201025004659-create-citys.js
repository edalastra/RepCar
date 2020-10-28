'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('cities', { 
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
        created_at: {
          type: Sequelize.DATE,
        },
        updated_at: {
          type: Sequelize.DATE,
        },
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('cities', {cascade: true});
  }
};
