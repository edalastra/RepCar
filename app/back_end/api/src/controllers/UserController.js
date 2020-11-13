const User = require('../models/User');
const { Address } = require('../models/Address');
const bcrypt = require('bcrypt');

module.exports = {
    async index(req, res) {

      const user = await User.findAll({
          where: req.query
        });

        return res.json(user);
    },
    async store(req, res) {
   
        const {cpf, email, password} = req.body;

        try {
          const hash = bcrypt.hashSync(password, 10);

        await User.findOrCreate({
            where: {cpf,email,},
            defaults :  Object.assign(req.body, { password: hash }),
                include: [{
                    model: Address,
                    as: 'address',
                }]
            
        }).spread(async (user, created) => {
            if(created) {
              console.log(user)
                const data = await user.authorize();
                res.json({
                    status: 'created with success',
                    ...data
                });
            } return res.status(400).json({ 
                status: 'error',
                msg: 'This user already registered'
            });
        })
        } catch(err){
          res.status(500).json({
            status: 'error',
            msg: 'Registration failed',
            error: err,
          });
        }
   },

   async login(req, res) {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).send(
          'Request missing username or password param'
        );
      }
    
      try {
        const user = await User.authenticate(email, password)
        return res.json(user);
    
      } catch (err) {
        return res.status(400).send('invalid email or password');
      }
    
    }
}