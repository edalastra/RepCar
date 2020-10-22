const Sequelize = require('sequelize');
const dbconfig = require('../config/database');

const { Vehicle, VehicleModel, VehicleBrand } = require('../models/Vehicle');

const connection = new Sequelize(dbconfig);


Vehicle.init(connection);
VehicleModel.init(connection);
VehicleBrand.init(connection);

Vehicle.associate(connection.models);
VehicleModel.associate(connection.models);
VehicleBrand.associate(connection.models);

module.exports = connection;