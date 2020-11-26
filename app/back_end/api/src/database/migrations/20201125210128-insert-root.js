'use strict';
const bcrypt = require('bcrypt');


module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('roots', [{
        username: 'root',
        password: bcrypt.hashSync('root', 10),
        created_at: new Date(),
        updated_at: new Date(),
      }])
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.sequelize.query(`DELETE FROM roots CASCADE;`);
  }
};
