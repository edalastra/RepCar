const {listUfs, listCitys} = require('../controllers/CityController');


module.exports = (app) => {

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

}