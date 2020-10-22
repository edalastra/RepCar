const { Model, DataTypes } = require('sequelize');

class Vehicle extends Model {
    static init(connection) {
       super.init({
           plate: DataTypes.STRING(7),
           year: DataTypes.STRING(4),
       }, {
           sequelize: connection
       }); 
    }

    static associate(models) {
        this.belongsTo(models.VehicleModel, { foreignKey: 'model_id', as: 'model_vehicle' } );
    }
}

class VehicleModel extends Model {
    static init(connection) {
        super.init({
            name: DataTypes.STRING,
        }, {
            sequelize: connection
        }); 
     }

    static associate(models) {
        this.belongsTo(models.VehicleBrand, { foreignKey: 'brand_id', as: 'brand' } );
    }
 }

class VehicleBrand extends Model {
    static init(connection) {
        super.init({
            name: DataTypes.STRING,
        }, {
            sequelize: connection
        }); 
     }

     static associate(models) {
        this.hasMany(models.VehicleModel, { foreignKey: 'brand_id', as: 'models' } );
    }
 }
module.exports = { Vehicle, VehicleModel, VehicleBrand };