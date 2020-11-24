const OrderService = require('../models/OrderService');
const Worker = require('../models/Worker')
const { Op } = require("sequelize");


const ServiceController = {
    async index(req, res) {
        const services = await ServiceOrder.findAll();
        return res.json(services);
    },

    async store(req, res) {
        const {date, shift} = req.body;

        // try {
            
            const workers = await OrderService.findAll({
                associations: 'worker'
             });

            return res.json(workers)

     
        

        // await User.findOrCreate({
        //     where: {cpf,email,},
        //     defaults :  Object.assign(req.body, { password: hash }),
        //         include: [{
        //             model: Address,
        //             as: 'address',
        //         }]
            
        // }).spread(async (user, created) => {
        //     if(created) {
        //       console.log(user)
        //         const data = await user.authorize();
        //         res.json({
        //             status: 'created with success',
        //             ...data
        //         });
        //     } return res.status(400).json({ 
        //         status: 'error',
        //         msg: 'This user already registered'
        //     });
        // })
        // } catch(err){
        //   res.status(500).json({
        //     status: 'error',
        //     msg: 'Registration failed',
        //     error: err,
        //   });
        // }
    }
}


module.exports = ServiceController;