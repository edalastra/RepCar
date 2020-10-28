const User = require('../models/User');
const { AddressController } = require('../controllers/AdressController');

module.exports = {
    async index(req, res) {
        const user = await User.findAll();

        return res.json(user);
    },
    async store(req, res) {
        const { 
            name,
            email,
            telephone,
            cpf,
            birth_date,
            password,
            type,
            address,
         } = req.body;

        // try {
            const address_id = await AddressController.store(address);
            const user = await User.create({ 
                name,
                email,
                telephone,
                cpf,
                birth_date,
                password,
                type,
                address_id,
            });
    
            return res.json(user)
        // } catch(err) {
        //     return res.status(400).json({ error: err.message });
        // }
   }
}