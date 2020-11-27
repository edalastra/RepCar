const OrderService = require('../models/OrderService');
const User = require('../models/User');
const Service = require('../models/Service');
const Worker = require('../models/Worker')
const { Op } = require("sequelize");


const ServiceController = {
    async index(req, res) {
        const services = await ServiceOrder.findAll();
        return res.json(services);
    },

    async assignments(req, res) {
        const { id } = req.user;
        const services = await OrderService.findAll({
            where: { 
                '$worker.user_id$': id
             },
            include: [
                {association: 'worker'},
                {association: 'service'},
                {association: 'vehicle',
                    include: {association: 'model'}
                },    
            ]
        });
        return res.json(services);
    },

    async store(req, res) {
        const {date, shift} = req.body;

        // try {
            
            const workers = await Worker.findAll({
                include: {
                    association: 'orders', 
                    where: { [Op.and]: [{date}, {shift}] }
                }
             });

             
             const freeWorker = await Worker.findAll({
                 where: {id: {[Op.notIn]: workers.map((w, i) => w.id)}},
                 order: [['id', 'ASC'],],
                 limit: 1
             })

             if(freeWorker.length < 1) {
                 res.status(400).json({
                    error: 'Indisponibilidade de funcionários para essa data e turno'
             })}


             await OrderService.findOrCreate({
                where: {[Op.and]: [{date}, {shift}, {worker_id: freeWorker[0].id} ]},
                defaults :  Object.assign(req.body, { worker_id: freeWorker[0].id }),
                    include: [{
                        model: Service,
                        as: 'service',
                    }]
                
            }).spread(async (order, created) => {
                if(created) {
                    res.json(order);
                } return res.status(400).json({ 
                    status: 'error',
                    msg: 'This order already registered'
                });
            })
             
     
        

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