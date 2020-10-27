'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('users', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            isEmail: true,
          },
        },
        telephone: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            isNumeric: true,
          },
        },
        address_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        cpf: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            isNumeric: true,
            min: '11',
            max: '11'
          },
        },
        birthDate: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        type: {
          type: Sequelize.STRING(10),
          allowNull: false,
          validate: {
            isIn: [['customer', 'worker', 'admin']],
          },
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
      return queryInterface.dropTable('users');
  }
};
