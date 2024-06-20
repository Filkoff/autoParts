const controller = require('../controllers/Compare.controller');

module.exports = (app) => {
  app.post('/api/dealers/parts/compare', controller.getComparedParts);
};
