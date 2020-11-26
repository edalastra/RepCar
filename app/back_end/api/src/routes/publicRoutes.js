const express = require('express');
const { VehicleController, VehiclesModelController, vehiclesBrandController } = require('../controllers/VechicleController');
const UserController = require('../controllers/UserController');
const { AddressController, CityController, StateController } = require('../controllers/AdressController');
const ServiceController = require('../controllers/ServiceController');
const WorkerController = require('../controllers/WorkerController');
const AdminController = require('../controllers/AdminController');
const auth = require('../middleware/auth');
const routes = express.Router();

routes.get('/user', UserController.index);
routes.get('/state', StateController.index);
routes.get('/state/:state_id/city', CityController.index);
routes.get('/city/:query', CityController.index);
routes.post('/user/register', UserController.store);
routes.post('/user/authenticate', UserController.login);
routes.post('/admin/authenticate', AdminController.authenticate);
routes.post('/user/worker/authenticate', WorkerController.login);


module.exports = routes