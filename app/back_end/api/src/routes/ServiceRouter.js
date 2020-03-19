
const {createService,createScheduling} = require('../controllers/ServiceController');


module.exports = (router) => {

    router.post('/api/service/register', (req, res) => {
        
        createService(req.body)
            .then(result => res.json(result))
            .catch(err => res.status(err.status).json(err.msg))
    });

    router.post('/api/service/scheduling', (req, res) => {
        createScheduling(req.body)
            .then(result => res.json(result))
            .catch(err => res.status(err.status).json(err.msg))
    });


}