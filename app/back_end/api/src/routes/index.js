const express = require('express');
const router = express.Router();
const userRouter = require('./UserRouter');
const cityRouter = require('./CityRouter');
const serviceRouter = require('./ServiceRouter');
const vehicleRouter = require('./VehicleRouter');


module.exports = () => {
    userRouter(router);
    cityRouter(router);
    serviceRouter(router);
    vehicleRouter(router);
};