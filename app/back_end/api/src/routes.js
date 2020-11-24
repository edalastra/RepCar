const express = require('express');
const { VehicleController, VehiclesModelController, vehiclesBrandController } = require('./controllers/VechicleController');
const UserController = require('./controllers/UserController');
const { AddressController, CityController, StateController } = require('./controllers/AdressController');
const ServiceController = require('./controllers/ServiceController');
const auth = require('./middleware/auth');
const routes = express.Router();

routes.use(auth)

routes.get('/user', UserController.index);
routes.get('/state', StateController.index);
routes.get('/state/:state_id/city', CityController.index);
routes.get('/city/:query', CityController.index);
routes.get('/user/:user_id/vehicles', VehicleController.index)
routes.get('/vehicle/brands', vehiclesBrandController.index)
routes.get('/vehicle/brands/:brand_id/models', VehiclesModelController.index);
routes.get('/available/:page')

routes.post('/vehicle/register', VehicleController.store)
routes.post('/user/register', UserController.store);
routes.post('/user/authenticate', UserController.login);
routes.post('/service/register', ServiceController.store);

module.exports = routes