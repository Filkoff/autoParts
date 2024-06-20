const fs = require('fs');
const haversine = require('haversine-distance');

module.exports = {
  async getAllParts(req, res) {
    fs.readFile(
      __dirname + '/../data/allParts.json',
      'utf8',
      (err, jsonString) => {
        if (err) {
          res.status(404);
          console.error(err);
          return;
        }

        try {
          const customer = JSON.parse(jsonString);
          res.status(200).send(customer);
        } catch (err) {
          console.error(err);
          res.status(404);
        }
      }
    );
  },

  async getSortedParts(req, res) {
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
          const partsWithDist = parts.map((item) => {
            return {
              ...item,
              distance: haversine(item.dealer.coords, req.body.coordinates),
            };
          });
          const sortedParts = partsWithDist.sort(
            (a, b) => a.distance - b.distance
          );
          res.status(200).send(sortedParts);
        } catch (err) {
          console.error(err);
          res.status(404);
        }
      }
    );
  },
};
