const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const User = require("../models").User;
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const errorHandler = require("../utils/errorHandler");
const fs = require("fs");

module.exports = {
  async setDeliveryData(req, res) {
    try {
      res.status(200).send({ message: "data was saved" });
    } catch (err) {
      res.status(404).send(err.message);
    }
  },

  async getCustomerOrders(req, res) {
    fs.readFile(
      __dirname + "/../data/customerOrders.json",
      "utf8",
      (err, jsonString) => {
        if (err) {
          res.status(404).send(err.message);
          console.log(err);
          return;
        }
        try {
          const orders = JSON.parse(jsonString);
          res.status(200).send(orders);
        } catch (err) {
          console.log(err);
          res.status(404).send(err.message);
        }
      }
    );
  },
};
