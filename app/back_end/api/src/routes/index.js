const express = require('express');
const router = express.Router();
const userRouter = require('./UserRouter');
const cityRouter = require('./CityRouter');
const serviceRouter = require('./ServiceRouter');
const vehicleRouter = require('./VehicleRouter');


module.exports = app => {

    app.use('/api/user', userRouter);
    app.use('/api/city',cityRouter);
    app.use('/api/service',serviceRouter);
    app.use('/api/vehicle', vehicleRouter);
};