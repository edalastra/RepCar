const { Model, DataTypes } = require('sequelize');


class Worker extends Model {
    static init(connection) {
       super.init({
           CLT: DataTypes.STRING,
           PIS: DataTypes.STRING,
           genre: DataTypes.STRING,
           hour_value: DataTypes.DOUBLE,
           admission: DataTypes.DATEONLY,
       }, {
           sequelize: connection
       }); 
       
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' } );
        this.hasMany(models.ServiceOrder, { foreignKey: 'worker_id', as: 'services' });
    }

  
}

module.exports = Worker;