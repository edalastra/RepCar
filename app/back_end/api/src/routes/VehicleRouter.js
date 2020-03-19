const { listVehiclesRegistred, listBrands, listModels } = require('../controllers/VehicleController');
const router = require('express').Router();



    router.post('/list', (req, res) => {

        listVehiclesRegistred(req.body.userId)
            .then(result => res.json(result))
            .catch(err => res.status(err.status).json(err.msg));
    });

    router.get('/brands/list', (req, res) => {

        listBrands()
            .then(result => res.json(result))
            .catch(err => res.status(err.status).json(err.msg));
    });

    router.get('/models/list/:brandId', (req, res) => {


        listModels(req.params.brandId)
            .then(result => res.json(result))
            .catch(err => res.status(err.status).json(err.msg));
    });

module.exports = router;