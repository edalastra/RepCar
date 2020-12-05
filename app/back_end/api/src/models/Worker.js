const { Model, DataTypes } = require('sequelize');
const User = require('./User');
const bcrypt = require('bcrypt');
class Worker extends Model{
    static init(connection) {
        super.init({
            clt: DataTypes.STRING,
            pis: DataTypes.STRING,
            genre: DataTypes.STRING,
            hour_value: DataTypes.DOUBLE,
            admission: DataTypes.DATEONLY,
            admin: DataTypes.BOOLEAN,
        },{
            sequelize: connection,
        })
    }
    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' } );
        this.hasMany(models.OrderService, { foreignKey: 'worker_id', as: 'orders' } );

    }
    static async authenticate(email, password) {

        const worker = await Worker.findOne({ 
                include: {
                    association: 'user',
                    where: { email }
                  }
            });
            

        if(!worker) { throw new Error('User not found'); }
        if (bcrypt.compareSync(password, worker.user.password)) {
          return worker.user.authorize();
        }
        throw new Error('invalid password');
      }

} 

module.exports = Worker;
