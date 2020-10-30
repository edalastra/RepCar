const express = require('express');
const { vehicles, vehiclesModel, vehiclesBrand } = require('./controllers/VechicleController');
const UserController = require('./controllers/UserController');

const routes = express.Router();


routes.get('/vehicle', vehicles.index);
routes.post('/vehicle', vehicles.store);

// routes.get('/brand/:brand_id/model', vehiclesModel.index);


routes.post('/user/register', UserController.store);
routes.post('/user/authenticate', UserController.login)

module.exports = routes