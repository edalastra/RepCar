const {createUser} = require('./controllers/UserController');
const bcrypt = require('bcryptjs');

module.exports = (app) => {

    app.post('/', (req, res) => {
        
        // const {username, password} = req.body;

        // bcrypt.hash(password, 12)
        //     .then(hash => createUser(username, hash)
        //                     .then(newUser => res.json(newUser))
        //                     .catch(err => res.json(err))
        //     )
        //     .catch(err => res.json(err));
       
        createUser(req.body)
            .then(result => res.json(result))
            .catch(err => res.send(err))

    })
}