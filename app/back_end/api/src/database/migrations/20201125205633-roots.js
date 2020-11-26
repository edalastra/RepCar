'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  
    return queryInterface.createTable('roots', 
    { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING,
        allowNull:false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      user_id:{
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      
    });
    
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('roots');
  }
};
