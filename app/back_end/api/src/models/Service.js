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
        this.hasMany(models.OrderService, { foreignKey: 'service_id', as: "order" } );
    }
}

module.exports = Service;