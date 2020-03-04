const {createUser} = require('./controllers/UserController');
const bcrypt = require('bcryptjs');

module.exports = (app) => {

    app.post('/register/person', (req, res) => {
               
        createUser(req.body)
            .then(result => res.json(result))
            .catch(err => res.json(err))
    });

}