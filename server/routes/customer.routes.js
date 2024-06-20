const controller = require('../controllers/Customer.controller');
const authMiddleware = require('../middleware/auth.middleware');

module.exports = (app) => {
  app.post(
    '/api/user/delivery-data',
    authMiddleware,
    controller.setDeliveryData
  );
  app.get('/api/user/:id/orders', authMiddleware, controller.getCustomerOrders);
};
