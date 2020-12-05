const Worker = require('../models/Worker');
const User = require('../models/User');
const { Address } = require('../models/Address');
const { Op } = require('sequelize');

module.exports = {
    async index(req, res) {

        const workers = await Worker.findAll({
            include: {association: 'user',
            where: {[Op.not]: {id: req.user.id}}
          }
        });
        return res.json(workers)

    },
    async me(req, res) {

      return res.json(req.user);
    },

    async store(req, res) {


        try {    
          const {cpf, email, password} = req.body;

          const hash = bcrypt.hashSync(password, 10);

  
          await User.findOrCreate({
              where: {cpf,email,},
              defaults : Object.assign(req.body, { password: hash }),
                  include: [{
                      model: Worker,
                      as: 'worker'
                  },
                  {
                    model: Address,
                    as: 'address'
                }]
              
          }).spread((user, created) => {
              if(created) {
                  return res.json(user);
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
          const user = await Worker.authenticate(email, password)
          return res.json(user);
      
        } catch (err) {
          return res.status(400).send('invalid email or password');
        }
      
      }
}