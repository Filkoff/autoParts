const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = req.headers.authorization.split(' ')[2];
    if (!token) {
      return res.status(401).json({ message: 'Auth error' });
    }
    req.user = jwt.verify(token, keys.jwt);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Auth error' });
  }
};
