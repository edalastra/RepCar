const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const AuthToken = require('./AuthToken.js');

class Root extends Model {
    static init(connection) {
       super.init({
           username: DataTypes.STRING,
           password: DataTypes.STRING,
           
       }, {
           sequelize: connection
       }); 
    }

    static async authenticate(username, password) {
      const root = await Root.findOne({ where: { username }});

      if (bcrypt.compareSync(password, root.password)) {
        return root.authorize();
      }
      throw new Error('invalid password');
    }

    async authorize() {
      const root = this;
      const authToken = await AuthToken.generate(this.id);
      await AuthToken.create({token: toString(authToken), user_id: root.id});
      return { token: authToken.token }
    };

    static async logout(token) {
      AuthToken.destroy({ where: { token } });
    }
  
}

module.exports = Root;