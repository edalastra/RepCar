const {createUser} = require('./controllers/UserController');
const {listUfs, listCitys} = require('./controllers/CityController');

const bcrypt = require('bcryptjs');

module.exports = (app) => {
    console.log('r')
    app.post('/register/person', (req, res) => {
               
        createUser(req.body)
            .then(result => res.json(result))
            .catch(err => res.json(err))
    });

    app.get('/api/ufs', (req, res) => {
        console.log('au')
        listUfs()
            .then(ufs => res.json(ufs))
            .catch(err => res.json(err));
    });
    app.get('/api/citys/:uf', (req, res) => {
        listCitys(req.params.uf)
            .then(ufs => res.json(ufs))
            .catch(err => res.json(err));
    })

}