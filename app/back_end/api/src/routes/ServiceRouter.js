
const {createService,createScheduling} = require('../controllers/ServiceController');


module.exports = (app) => {

    app.post('/api/register/service', (req, res) => {
        
        createService(req.body)
            .then(result => res.json(result))
            .catch(err => res.status(err.status).json(err.msg))
    });

    app.post('/api/create/scheduling', (req, res) => {
        createScheduling(req.body)
            .then(result => res.json(result))
            .catch(err => res.status(err.status).json(err.msg))
    });


}