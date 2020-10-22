const express = require('express');
const { vehicles, vehiclesModel, vehiclesBrand } = require('./controllers/VechicleController');

const routes = express.Router();


routes.get('/vehicle', vehicles.index);
routes.post('/vehicle', vehicles.store);

routes.get('/brand/:brand_id/model', vehiclesModel.index);



module.exports = routes