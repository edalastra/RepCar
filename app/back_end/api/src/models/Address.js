const { Model, DataTypes } = require('sequelize');

class Address extends Model {
    static init(connection) {
       super.init({
            zipcode: DataTypes.STRING,
            street: DataTypes.STRING,
            number: DataTypes.STRING,
            complement: DataTypes.STRING,
            neighborhood: DataTypes.STRING,
       }, {
            sequelize: connection
       }); 
    }

    static associate(models) {
        this.belongsTo(models.City, { foreignKey: 'city_id', as: 'city' } );
        this.hasMany(models.User, { foreignKey: 'address_id', as: 'user' });
    }
}

class City extends Model {
    static init(connection) {
        super.init({
            name: DataTypes.STRING,
        }, {
            sequelize: connection
        }); 
     }

    static associate(models) {
        this.belongsTo(models.State, { foreignKey: 'state_id', as: 'state' } );
    }
 }

class State extends Model {
    static init(connection) {
        super.init({
            name: DataTypes.STRING,
            uf: DataTypes.STRING,
        }, {
            sequelize: connection
        }); 
     }

     static associate(models) {
        this.hasMany(models.City, { foreignKey: 'state_id', as: 'cities' } );
    }
 }
module.exports = { Address, City, State };