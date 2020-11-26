const Worker = require('../models/Worker');
const User = require('../models/User');
const { Address } = require('../models/Address');

module.exports = {
    async index(req, res) {

        const admins = await Worker.findAll({
            where: {type: 'admin'}
        },{
            include: {association: 'user'}
        });
        return res.json(admins)

    },
    async me(req, res) {

      return res.json(req.user);
    },

    async store(req, res) {


        try {    
          const {cpf, email} = req.body;
  
          await User.findOrCreate({
              where: {cpf,email,},
              defaults :  req.body,
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