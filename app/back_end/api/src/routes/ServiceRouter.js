
const {createService,createScheduling} = require('../controllers/ServiceController');

const router = require('express').Router();


    router.post('/register', (req, res) => {
        
        createService(req.body)
            .then(result => res.json(result))
            .catch(err => res.status(err.status).json(err.msg))
    });

    router.post('/scheduling', (req, res) => {
        createScheduling(req.body)
            .then(result => res.json(result))
            .catch(err => res.status(err.status).json(err.msg))
    });

module.exports = router;