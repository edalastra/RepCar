const { Model, DataTypes } = require('sequelize');

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
        this.belongsTo(models.VehicleModel, { foreignKey: 'address_id', as: 'address' } );
        this.hasMany(models.Vehicle, {foreignKey: 'owner_id', as: 'vehicles'});
    }
}

module.exports = User;