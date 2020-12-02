const express = require('express');
const WorkerController = require('../controllers/WorkerController');
const worker = require('../middleware/worker');
const ServiceController = require('../controllers/ServiceController');
const ServiceItemController = require('../controllers/ServiceItemController');
const routes = express.Router();


routes.use(worker)

routes.get('/user/worker/me', WorkerController.me);
routes.get('/services/worker/', ServiceController.assignments);
routes.get('/service/order/:order_id/item', ServiceItemController.index);
routes.get('/service/order/:order_id/finished', ServiceController.finished);


routes.post('/service/order/:order_id/item/register', ServiceItemController.store);

routes.delete('/service/order/:order_id/item/:item_id/delete', ServiceItemController.delete)


module.exports = routes;