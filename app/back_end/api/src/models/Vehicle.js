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
        this.belongsTo(models.User, {foreignKey:'owner_id', as: 'owner'})
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
        this.hasMany(models.ServiceOrder, { foreignKey: 'vehicle_id', as: 'service_order' } );
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