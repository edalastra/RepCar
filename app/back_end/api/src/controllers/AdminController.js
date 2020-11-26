const Worker = require('../models/Worker');
const Root = require('../models/Root');

module.exports = {
    async index(req, res) {

        const admins = await Worker.findAll({
            where: {type: 'admin'}
        });
        return res.json(admins)

    },

    async authenticate(req, res) {
        const { username, password } = req.body;
  
        if (!username || !password) {
          return res.status(400).send(
            'Request missing username or password param'
          );
        }
      
        // try {
          const root = await Root.authenticate(username, password)
          return res.json(root);
      
        // } catch (err) {
        //   return res.status(400).send('invalid username or password');
        // }
      
      }
}