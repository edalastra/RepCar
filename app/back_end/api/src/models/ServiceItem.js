const { Model, DataTypes } = require('sequelize');

class ServiceItem extends Model {
    static init(connection) {
       super.init({
            description: DataTypes.TEXT,
           price: DataTypes.DOUBLE,
       }, {
           sequelize: connection
       }); 
    }

    static associate(models) {
        this.belongsTo(models.OrderService, { foreignKey: 'order_id', as: "items" } );
    }
}

module.exports = ServiceItem;