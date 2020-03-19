const {createUser, userAuthenticate, uniqueCpf} = require('../controllers/UserController');
const auth = require('../middleware/auth');
const router = require('express').Router();


    router.post('/register',  (req, res) => {
        createUser(req.body)
            .then(result => res.status(201).json(result))
            .catch(err => res.status(err.status).json(err.msg))
    });



    router.post('/authenticate', (req, res) => {

        userAuthenticate(req.body)
            .then(token => res.json(token))
            .catch(err => res.status(err.status).send(err.msg));

    });
    
    router.post('/uniquecpf', (req, res) => {
        uniqueCpf(req.body.cpf)
            .then(resp => res.json(resp))
            .catch(err => res.status(err.status).send(err.msg));
    });

    router.post('/api/token', auth, (req, res) => {
        res.send('ss')
    });

module.exports = router;