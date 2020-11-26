const express = require('express');
const { VehicleController, VehiclesModelController, vehiclesBrandController } = require('../controllers/VechicleController');
const UserController = require('../controllers/UserController');
const { AddressController, CityController, StateController } = require('../controllers/AdressController');
const ServiceController = require('../controllers/ServiceController');
const Worker = require('../controllers/WorkerController');
const AdminController = require('../controllers/AdminController');
const auth = require('../middleware/auth');
const WorkerController = require('../controllers/WorkerController');
const routes = express.Router();
const admin = require('../middleware/admin');

routes.use(admin);



routes.post('/user/worker/register', WorkerController.store);

module.exports = routes;