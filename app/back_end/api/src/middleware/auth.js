const AuthToken = require('../models/AuthToken');


module.exports = async function(req, res, next) {

  const token = req.headers.authorization;
  if (token) {
    const authToken = await AuthToken.findOne(
      { where: { token: token }, include: [ { association: 'user' }] }
    );
    if (authToken) {
      req.user = authToken.user;
    }
    else {
      return res.json('Invalid Token');
    }
    return next();
  }
  return res.json('No token provider');

}