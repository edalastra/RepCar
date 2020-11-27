const { Model, DataTypes } = require('sequelize');

class Vehicle extends Model {
    static init(connection) {
       super.init({
           plate: DataTypes.STRING,
           year: DataTypes.STRING,
       }, {
           sequelize: connection
       }); 
    }

    static associate(models) {
        this.belongsTo(models.VehicleModel, { foreignKey: 'model_id', as: 'model' } );
        this.belongsTo(models.User, { foreignKey:'owner_id', as: 'owner'});
        this.hasMany(models.OrderService, { foreignKey: 'vehicle_id', as: 'services' } );
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