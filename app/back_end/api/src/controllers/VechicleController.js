const { Vehicle, VehicleBrand, VehicleModel } = require('../models/Vehicle');

const vehicles = {
    async index(req, res) {
        const vehicle = await Vehicle.findAll();

        return res.json(vehicle);
    },
    async store(req, res) {
        const { model_id } = req.params;
        const { plate, year } = req.body;

        const model = await VehiclesModel.findByPk(model_id);

        if (!model) {
            return res.status(400).json({ error: 'Model not found' });
        }

        const vehicle = await Vehicle.create({ 
            plate, 
            year,
            model_id,
        });

        return res.json(vehicle)
   }
}

const vehiclesModel = {
    async index(req, res) {
        const { brand_id } = req.params

        const brand = await VehicleBrand.findByPk(brand_id, { 
            include: { association: 'models' } 
        });
        return res.json(brand);
    },
}


const vehiclesBrand = {
    async index(req, res) {
        const brand = await Vehicle.findAll();

        return res.json(brand);
    },
}

module.exports = { vehicles, vehiclesBrand, vehiclesModel }