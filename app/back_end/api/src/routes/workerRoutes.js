const express = require('express');
const WorkerController = require('../controllers/WorkerController');
const worker = require('../middleware/worker');
const ServiceController = require('../controllers/ServiceController');
const routes = express.Router();


routes.use(worker)

routes.get('/user/worker/me', WorkerController.me)
routes.get('/services/worker/', ServiceController.assignments)


module.exports = routes;