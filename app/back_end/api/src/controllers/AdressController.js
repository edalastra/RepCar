const { Address, City, State } = require('../models/Address');

const AddressController = {
    async index(req, res) {
        const address = await Address.findAll();
        return res.json(address);
    },

    async store(data) {
        const { 
            zipcode,
            city_id,
            street,
            number,
            complement,
            neighborhood,
         } = data;

         const findCity = await City.findByPk(city_id);

         if (!findCity) {
            throw Exception('City not found')
         }

         const address = await Address.create({ 
            zipcode,
            city_id,
            street,
            number,
            complement,
            neighborhood,
        });

        return address.id; 
    }
}

const CityController = {
    async index(req, res) {
        const { state_id } = req.params

        const state = await State.findByPk(state_id, { 
            include: { association: 'cities' } 
        });
        return res.json(state);
    },
}


const StateController = {
    async index(req, res) {
        const state = await State.findAll();
        return res.json(state);
    },
}

module.exports = { AddressController, CityController, StateController }