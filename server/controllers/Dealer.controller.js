const fs = require('fs');

module.exports = {
  async getAllDealerParts(req, res) {
    fs.readFile(
      __dirname + '/../data/dealerParts.json',
      'utf8',
      (err, jsonString) => {
        if (err) {
          res.status(404);
          console.error(err);
          return;
        }
        try {
          const parts = JSON.parse(jsonString);
          res.status(200).send(parts);
        } catch (err) {
          console.error(err);
          res.status(404);
        }
      }
    );
  },

  async deleteDealerPart(req, res) {
    try {
      res.status(200).send({ message: 'part was deleted' });
    } catch (err) {
      console.error(err);
      res.status(404);
    }
  },

  async changeDealerPart(req, res) {
    try {
      res.status(200).send({ message: 'part was updated' });
    } catch (err) {
      console.error(err);
      res.status(404);
    }
  },

  async addNewPart(req, res) {
    try {
      res.status(200).send({ message: 'part was added' });
    } catch (err) {
      console.error(err);
      res.status(404);
    }
  },

  async getDealerOrders(req, res) {
    fs.readFile(
      __dirname + '/../data/dealerOrders.json',
      'utf8',
      (err, jsonString) => {
        if (err) {
          res.status(404);
          console.error(err);
          return;
        }
        try {
          const parts = JSON.parse(jsonString);
          res.status(200).send(parts);
        } catch (err) {
          console.error(err);
          res.status(404);
        }
      }
    );
  },
};
