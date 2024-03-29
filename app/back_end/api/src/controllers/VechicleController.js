const { Vehicle, VehicleBrand, VehicleModel } = require('../models/Vehicle');
const User = require('../models/User');
const { Op } = require("sequelize");
 

const VehicleController = {
    async index(req, res) {
        const user_id  = req.user.id;
        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        const { vehicles } = await User.findByPk(user_id, { 
            include: [{ 
                association: 'vehicles',
                attributes: ['id', 'year', 'plate'],
                include: {
                    association: 'model',
                    attributes: ['name'],
                    include: {
                        association: 'brand',
                        attributes: ['name']
                    }
                },
                
            }],
        });

        return res.json(vehicles);
    },
    async store(req, res) {
        const owner_id = req.user.id;
        
        const { plate, year, model_id } = req.body;

        const model = await VehicleModel.findByPk(model_id);
        const user = await User.findByPk(owner_id);

        if (!model) {
            return res.status(400).json({ error: 'Model not found' });
        }
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        const vehicle = await Vehicle.create({ 
            plate, 
            year,
            model_id,
            owner_id
        });

        return res.json(vehicle)
   },

   async delete(req, res){
       const owner_id = req.user.id;
       console.log(req.body)
       const { id } = req.params

       const deleted = await Vehicle.destroy({
        where: {
            [Op.and]: [{ owner_id }, { id }]
        }
      });
      return res.json(deleted);
   }
}

const VehiclesModelController = {
    async index(req, res) {
        const { brand_id } = req.params

        const { models } = await VehicleBrand.findByPk(brand_id, { 
            include: { association: 'models', attributes: ['id', 'name'] } 
        });
        return res.json(models);
    },
}


const vehiclesBrandController = {
    async index(req, res) {
        const brand = await VehicleBrand.findAll({
            attributes: ['id', 'name']
        });

        return res.json(brand);
    },
}

module.exports = { VehicleController, VehiclesModelController, vehiclesBrandController }