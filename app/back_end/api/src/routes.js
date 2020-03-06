const {createUser, userAuthenticate} = require('./controllers/UserController');
const {createService, listVehicles} = require('./controllers/ServiceController');
const {listUfs, listCitys} = require('./controllers/CityController');


module.exports = (app) => {
    app.post('/api/register/user', (req, res) => {
        

        createUser(req.body)
            .then(result => res.json(result))
            .catch(err => res.status(err.status).json(err.msg))
    });

    app.post('/api/register/service', (req, res) => {
        
        createService(req.body)
            .then(result => res.json(result))
            .catch(err => res.status(err.status).json(err.msg))
    });

    
    app.post('/api/list/vehicles', (req, res) => {

        listVehicles(req.body.userId)
            .then(result => res.json(result))
            .catch(err => res.status(err.status).json(err.msg));
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