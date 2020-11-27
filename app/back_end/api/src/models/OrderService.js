const { Model, DataTypes } = require('sequelize');

class OrderService extends Model {
    static init(connection) {
       super.init({
           date: DataTypes.DATEONLY,
           shift: DataTypes.STRING,
       }, {
           sequelize: connection
       }); 
    }

    static associate(models) {
        this.belongsTo(models.Service, { foreignKey: 'service_id', as: 'service' } );
        this.belongsTo(models.Worker, { foreignKey: 'worker_id', as: 'worker' } );
        this.belongsTo(models.Vehicle, { foreignKey: 'vehicle_id', as: 'vehicle' } );

    }
}

module.exports = OrderService;