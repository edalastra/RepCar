const {createUser, userAuthenticate} = require('./controllers/UserController');
const {listUfs, listCitys} = require('./controllers/CityController');


module.exports = (app) => {
    app.post('/api/register/user', (req, res) => {
        console.log(req.body)

        createUser(req.body)
            .then(result => res.json(result))
            .catch(err => res.status(400).json(err))
    });

    app.get('/api/ufs', (req, res) => {
       
        listUfs()
            .then(ufs => res.json(ufs))
            .catch(err => res.json(err));
    });
    app.get('/api/citys/:uf', (req, res) => {
        listCitys(req.params.uf)
            .then(ufs => res.json(ufs))
            .catch(err => res.json(err));
    });
    app.post('/api/authenticate', (req, res) => {

        userAuthenticate(req.body)
            .then(token => res.json(token))
            .catch(err => res.status(err.status).send(err.msg));

    });

}