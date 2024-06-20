const controller = require('../controllers/Profile.controller');

module.exports = (app) => {
  app.post('/api/user/profile/name', controller.changeName);
  app.post('/api/user/profile/description', controller.changeDescription);
  app.post('/api/user/profile/address', controller.setAddress);
};
