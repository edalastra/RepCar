const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const AuthToken = require('./AuthToken.js');
class User extends Model {
    static init(connection) {
       super.init({
           name: DataTypes.STRING,
           email: DataTypes.STRING,
           telephone: DataTypes.STRING,
           cpf: DataTypes.STRING,
           birth_date: DataTypes.DATE,
           password: DataTypes.STRING,
           type: DataTypes.STRING,
       }, {
           sequelize: connection
       }); 
    }

    static associate(models) {
        this.belongsTo(models.Address, { foreignKey: 'address_id', as: 'address' } );
        this.hasMany(models.Vehicle, { foreignKey: 'owner_id', as: 'vehicles' });
        this.hasMany(models.AuthToken, { foreignKey: 'user_id', as: 'token' })
    }

    static async authenticate(email, password) {
      const user = await User.findOne({ where: { email } });
      if (bcrypt.compareSync(password, user.password)) {
        return user.authorize();
      }
      throw new Error('invalid password');
    }

    async authorize() {
      const user = this;
      const authToken = await AuthToken.generate(this.id);
      await AuthToken.create({token: toString(authToken), user_id: this.id});
      return { user, authToken }
    };

    static async logout(token) {
      AuthToken.destroy({ where: { token } });
    }
  
}

module.exports = User;