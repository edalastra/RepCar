const {listUfs, listCitys} = require('../controllers/CityController');
const router = require('express').Router();



    router.get('/uf/list', (req, res) => {
       
        listUfs()
            .then(ufs => res.json(ufs))
            .catch(err => res.json(err));
    });
    router.get('/list/:uf', (req, res) => {
        listCitys(req.params.uf)
            .then(ufs => res.json(ufs))
            .catch(err => res.json(err));
    });

module.exports = router;