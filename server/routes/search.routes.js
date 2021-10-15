const controller = require('../controllers/Search.controller');

module.exports = (app) => {
  app.post('/api/parts/search', controller.getAllParts);
  app.post('/api/dealers/parts/all/byDistance', controller.getSortedParts);
};
