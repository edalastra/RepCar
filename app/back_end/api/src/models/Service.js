const { Model, DataTypes } = require('sequelize');

class Service extends Model {
    static init(connection) {
       super.init({
           description: DataTypes.TEXT,
           notes: DataTypes.TEXT,
       }, {
           sequelize: connection
       }); 
    }

    static associate(models) {
        this.belongsTo(models.Vehicle, { foreignKey: 'vehicle_id', as: 'vehicle' } );
        this.hasOne(models.ServiceOrder, { foreignKey: 'service_id', as: "orders" } );
    }
}

module.exports = Service;