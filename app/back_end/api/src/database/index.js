const Sequelize = require('sequelize');
const dbconfig = require('../config/database');
const { Vehicle, VehicleModel, VehicleBrand }  = require('../models/Vehicle');
const { Address, City, State } = require('../models/Address');
const User = require('../models/User');
const Worker = require('../models/Worker');
const Service = require('../models/Service');
const OrderService = require('../models/OrderService');
const AuthToken = require('../models/AuthToken');
const ServiceItem = require('../models/ServiceItem');
const Root = require('../models/Root');
const { associate } = require('../models/OrderService');

const connection = new Sequelize(dbconfig);


Vehicle.init(connection);
VehicleModel.init(connection);
VehicleBrand.init(connection);
Address.init(connection);
City.init(connection);
State.init(connection);
User.init(connection);
AuthToken.init(connection);
Service.init(connection);
OrderService.init(connection);
Worker.init(connection);
Root.init(connection);
ServiceItem.init(connection);

Vehicle.associate(connection.models);
VehicleModel.associate(connection.models);
VehicleBrand.associate(connection.models);
Address.associate(connection.models);
City.associate(connection.models);
State.associate(connection.models);
User.associate(connection.models);
AuthToken.associate(connection.models);
Service.associate(connection.models);
OrderService.associate(connection.models);
Worker.associate(connection.models);
ServiceItem.associate(connection.models);






module.exports = connection;