const fs = require('fs');

module.exports = {
  async setDeliveryData(req, res) {
    try {
      res.status(200).send({ message: 'data was saved' });
    } catch (err) {
      res.status(404).send(err.message);
    }
  },

  async getCustomerOrders(req, res) {
    fs.readFile(
      __dirname + '/../data/customerOrders.json',
      'utf8',
      (err, jsonString) => {
        if (err) {
          res.status(404).send(err.message);
          console.error(err);
          return;
        }

        try {
          const orders = JSON.parse(jsonString);
          res.status(200).send(orders);
        } catch (err) {
          console.error(err);
          res.status(404).send(err.message);
        }
      }
    );
  },
};
