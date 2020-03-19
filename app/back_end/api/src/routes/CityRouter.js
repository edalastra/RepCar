const {listUfs, listCitys} = require('../controllers/CityController');


module.exports = (router) => {

    router.get('/city/ufs/list', (req, res) => {
       
        listUfs()
            .then(ufs => res.json(ufs))
            .catch(err => res.json(err));
    });
    router.get('/city/list/:uf', (req, res) => {
        listCitys(req.params.uf)
            .then(ufs => res.json(ufs))
            .catch(err => res.json(err));
    });

}