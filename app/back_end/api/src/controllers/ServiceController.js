const OrderService = require('../models/OrderService');
const User = require('../models/User');
const Service = require('../models/Service');
const Worker = require('../models/Worker')
const { Op, QueryTypes } = require("sequelize");
const db = require('../database');

const ServiceController = {
    async index(req, res) {
        const user_id = req.user.id
        const orders = await OrderService.findAll({
            include: [{
                association: 'vehicle',
                required: true,
                where: {owner_id: user_id},
                include: {
                    association: 'model',
                    attributes: ['name'],
                    include: {
                        association: 'brand',
                        attributes: ['name']
                    }
                }
            },
            {
                association: 'service',
                required: true,
            }]
        });
        return res.json(orders);
    },

    async reservedDates(req, res) {
        const orders = await db.query(
            `SELECT os.date FROM workers w
            JOIN order_services os ON os.worker_id = w.id
            WHERE os.status != 'finished'
            GROUP BY os.date
            HAVING ((SELECT COUNT(*) FROM workers) - COUNT(w.id)) = 0;`, 
            { type: QueryTypes.SELECT });

        return res.json(orders)

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
        const {date } = req.body;

        // try {
            
            const workers = await Worker.findAll({
                include: {
                    association: 'orders', 
                    where: { date }
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
                where: {[Op.and]: [{date}, {worker_id: freeWorker[0].id} ]},
                defaults :  Object.assign(req.body, 
                    { worker_id: freeWorker[0].id, status: 'pending' }),
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
             
     
        

    },

    async finished(req, res) {
        const { order_id } = req.params;

        const order = OrderService.update({status: 'finished'}, {
            where: { id: order_id }
        });

        return res.json(order);
    }
}


module.exports = ServiceController;