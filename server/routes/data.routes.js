const controller = require('../controllers/Data.controller');

module.exports = (app) => {
  app.get('/api/models/all', controller.getAllModels);
  app.get('/api/parts/all', controller.getAllParts);
  app.post('/api/dealers/parts/all', controller.getDealerParts);
};
