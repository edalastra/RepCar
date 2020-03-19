const { listVehiclesRegistred, listBrands, listModels } = require('../controllers/VehicleController');


module.exports = (app) => {

    app.post('/api/list/vehicles', (req, res) => {

        listVehiclesRegistred(req.body.userId)
            .then(result => res.json(result))
            .catch(err => res.status(err.status).json(err.msg));
    });

    app.get('/api/list/brands', (req, res) => {

        listBrands()
            .then(result => res.json(result))
            .catch(err => res.status(err.status).json(err.msg));
    });

    app.get('/api/list/models/:brandId', (req, res) => {


        listModels(req.params.brandId)
            .then(result => res.json(result))
            .catch(err => res.status(err.status).json(err.msg));
    });

}