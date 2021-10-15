const controller = require('../controllers/Dealer.controller');
const authMiddleware = require('../middleware/auth.middleware');

module.exports = (app) => {
  app.get(
    '/api/dealer/parts/all',
    authMiddleware,
    controller.getAllDealerParts
  );

  app.delete(
    '/api/dealer/parts/:id',
    authMiddleware,
    controller.deleteDealerPart
  );

  app.patch(
    '/api/dealer/parts/:id',
    authMiddleware,
    controller.changeDealerPart
  );

  app.post('/api/dealer/parts/add', authMiddleware, controller.addNewPart);

  app.get('/api/dealer/:id/orders', authMiddleware, controller.getDealerOrders);
};
