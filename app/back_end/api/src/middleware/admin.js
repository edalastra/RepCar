const AuthToken = require('../models/AuthToken');


module.exports = async function(req, res, next) {

  const token = req.headers.authorization;
  if (token) {
    const authToken = await AuthToken.findOne(
      { where: { token: token },
      include: {
        association: 'user',
        include: {
          association: 'worker',
          where: {admin: true},
          require: true
      }
      }}
    );
    
    if (!authToken) {
      return res.json('Invalid access level');
    }
    return next();
  }
  return res.json('No token provider');
}