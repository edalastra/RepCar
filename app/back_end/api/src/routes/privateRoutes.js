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


routes.use(auth)

routes.post('/vehicle/register', VehicleController.store)
routes.post('/service/register', ServiceController.store);
routes.get('/user/vehicles', VehicleController.index)
routes.get('/vehicle/brands', vehiclesBrandController.index)
routes.get('/vehicle/brands/:brand_id/models', VehiclesModelController.index);
routes.get('/user/services', ServiceController.index);
routes.get('/services/date/reserved', ServiceController.reservedDates);
routes.get('/user', UserController.index);


routes.delete('/vehicle/:id/delete', VehicleController.delete)
module.exports = routes;