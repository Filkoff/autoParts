const authMiddleware = require('../middleware/auth.middleware');
const controller = require('../controllers/File.controller');

module.exports = (app) => {
  app.post('/api/user/avatar', authMiddleware, controller.uploadAvatar);
  app.delete('/api/user/avatar', authMiddleware, controller.deleteAvatar);
};
