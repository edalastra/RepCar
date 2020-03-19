const {createUser, userAuthenticate} = require('../controllers/UserController');
const auth = require('../middleware/auth');


module.exports = (app) => {
    app.post('/api/register/user',  (req, res) => {
        

        createUser(req.body)
            .then(result => res.json(result))
            .catch(err => res.status(err.status).json(err.msg))
    });



    app.post('/api/authenticate', (req, res) => {

        userAuthenticate(req.body)
            .then(token => res.json(token))
            .catch(err => res.status(err.status).send(err.msg));

    });

    app.post('/api/token', auth, (req, res) => {
        res.send('ss')
    })
}