const { Model, DataTypes } = require('sequelize');

class OrderService extends Model {
    static init(connection) {
       super.init({
           date: DataTypes.DATEONLY,
           status: DataTypes.STRING,
       }, {
           sequelize: connection
       }); 
    }

    static associate(models) {
        this.belongsTo(models.Service, { foreignKey: 'service_id', as: 'service' } );
        this.belongsTo(models.Worker, { foreignKey: 'worker_id', as: 'worker' } );
        this.belongsTo(models.Vehicle, { foreignKey: 'vehicle_id', as: 'vehicle' } );
        this.hasMany(models.ServiceItem, { foreignKey: 'order_id',  as: 'order'})
    }
}

module.exports = OrderService;