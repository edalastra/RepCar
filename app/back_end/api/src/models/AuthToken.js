const { Model, DataTypes } = require('sequelize');
var jwt = require('jsonwebtoken');


class AuthToken extends Model{
    static init(connection) {
        super.init({
            token: {
                type: DataTypes.STRING,
                allowNull: false,
                }
        },{
            sequelize: connection,
        })
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    }
    static async generate(UserId) {
        if (!UserId) {
            throw new Error('AuthToken requires a user ID')
        }
        const token = jwt.sign({ id: UserId }, "secret", {
            expiresIn: 86400
            });

        return AuthToken.create({ token, user_id: UserId })
        }
} 

module.exports = AuthToken;
