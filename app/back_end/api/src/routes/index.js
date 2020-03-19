const userRouter = require('./UserRouter');
const cityRouter = require('./CityRouter');
const serviceRouter = require('./ServiceRouter');
const vehicleRouter = require('./VehicleRouter');


module.exports = app => {

    userRouter(app);
    cityRouter(app);
    serviceRouter(app);
    vehicleRouter(app);
};