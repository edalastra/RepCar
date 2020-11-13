const express = require('express');
const { vehicles, vehiclesModel, vehiclesBrand } = require('./controllers/VechicleController');
const UserController = require('./controllers/UserController');
const { AddressController, CityController, StateController } = require('./controllers/AdressController');

const routes = express.Router();


routes.get('/user', UserController.index);
routes.get('/state', StateController.index);
routes.get('/state/:state_id/city', CityController.index);
routes.get('/city/:query', CityController.index);

// routes.get('/brand/:brand_id/model', vehiclesModel.index);


routes.post('/user/register', UserController.store);
routes.post('/user/authenticate', UserController.login)

module.exports = routes