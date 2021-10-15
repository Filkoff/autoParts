const fs = require('fs');

module.exports = {
  async getAllModels(req, res) {
    fs.readFile(
      __dirname + '/../data/models.json',
      'utf8',
      (err, jsonString) => {
        if (err) {
          res.status(404).send(err.message);
          console.log(err);
          return;
        }
        try {
          const models = JSON.parse(jsonString);
          res.status(200).send(models);
        } catch (err) {
          console.log(err);
          res.status(404).send(err.message);
        }
      }
    );
  },
  async getAllParts(req, res) {
    fs.readFile(
      __dirname + '/../data/allParts.json',
      'utf8',
      (err, jsonString) => {
        if (err) {
          res.status(404);
          console.log(err);
          return;
        }
        try {
          const parts = JSON.parse(jsonString);
          res.status(200).send(parts);
        } catch (err) {
          console.log(err);
          res.status(404);
        }
      }
    );
  },

  async getDealerParts(req, res) {
    fs.readFile(
      __dirname + '/../data/dealerParts.json',
      'utf8',
      (err, jsonString) => {
        if (err) {
          res.status(404);
          console.log(err);
          return;
        }
        try {
          const parts = JSON.parse(jsonString);
          res.status(200).send(parts);
        } catch (err) {
          console.log(err);
          res.status(404);
        }
      }
    );
  },
};
