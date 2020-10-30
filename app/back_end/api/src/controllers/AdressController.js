const { Address, City, State } = require('../models/Address');

const AddressController = {
    async index(req, res) {
        const address = await Address.findAll();
        return res.json(address);
    },
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