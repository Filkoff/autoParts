const controller = require('../controllers/Auth.controller');
const { check } = require('express-validator');
const authMiddleware = require('../middleware/auth.middleware');

module.exports = (app) => {
  app.post('/api/login', controller.login);

  app.post(
    '/api/register',
    [
      check('email', 'uncorrect email').isEmail(),
      check('password', 'uncorrect pass').isLength({ min: 4, max: 12 }),
    ],
    controller.register
  );

  app.get('/api/auth', authMiddleware, controller.auth);
};
