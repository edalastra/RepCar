const { listVehiclesRegistred, listBrands, listModels } = require('../controllers/VehicleController');


module.exports = (router) => {

    router.post('/vehicle/list', (req, res) => {

        listVehiclesRegistred(req.body.userId)
            .then(result => res.json(result))
            .catch(err => res.status(err.status).json(err.msg));
    });

    router.get('/vehicle/brands/list', (req, res) => {

        listBrands()
            .then(result => res.json(result))
            .catch(err => res.status(err.status).json(err.msg));
    });

    router.get('/vehicle/models/list/:brandId', (req, res) => {


        listModels(req.params.brandId)
            .then(result => res.json(result))
            .catch(err => res.status(err.status).json(err.msg));
    });

}