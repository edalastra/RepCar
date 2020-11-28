const ServiceItem = require('../models/ServiceItem');
const { Op } = require('sequelize');

module.exports = {
    async index(req, res) {
        const { order_id } = req.params;
        const items = await ServiceItem.findAll({
            where: { order_id },
            order: [
                ['id', 'DESC']
            ]
        });
        return res.json(items)
    },
    async store(req, res) {
        const { order_id } = req.params;
        const { description, price } = req.body;

        const item = await ServiceItem.create(
            { description, price, order_id }
        );

        return res.json(item);
    },

    async delete(req, res) {
        const { order_id, item_id } = req.params;

        const item = await ServiceItem.destroy({
            where: {[Op.and]: [{order_id}, {id: item_id}]}
        });

        return res.json(item);
    }
}