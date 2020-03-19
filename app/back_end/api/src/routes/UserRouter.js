const {createUser, userAuthenticate, validCpf} = require('../controllers/UserController');
const auth = require('../middleware/auth');


module.exports = (router) => {
    router.post('/user/register',  (req, res) => {
    
        createUser(req.body)
            .then(result => res.json(result))
            .catch(err => res.status(err.status).json(err.msg))
    });



    router.post('/user/authenticate', (req, res) => {

        userAuthenticate(req.body)
            .then(token => res.json(token))
            .catch(err => res.status(err.status).send(err.msg));

    });
    
    router.post('/user/validcpf', (req, res) => {
        validCpf(req.body.cpf)
            .then(resp => res.json(resp))
            .catch(err => res.status(err.status).send(err.msg));
    });

    router.post('/api/token', auth, (req, res) => {
        res.send('ss')
    });
}