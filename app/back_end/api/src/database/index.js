const Sequelize = require('sequelize');
const dbconfig = require('../config/database');

const { Vehicle, VehicleModel, VehicleBrand }  = require('../models/Vehicle');
const { Address, City, State } = require('../models/Address');
const User = require('../models/User');
const AuthToken = require('../models/AuthToken');

const connection = new Sequelize(dbconfig);


Vehicle.init(connection);
VehicleModel.init(connection);
VehicleBrand.init(connection);
Address.init(connection);
City.init(connection);
State.init(connection);
User.init(connection);
AuthToken.init(connection);

Vehicle.associate(connection.models);
VehicleModel.associate(connection.models);
VehicleBrand.associate(connection.models);
Address.associate(connection.models);
City.associate(connection.models);
State.associate(connection.models);
User.associate(connection.models);
AuthToken.associate(connection.models);

module.exports = connection;