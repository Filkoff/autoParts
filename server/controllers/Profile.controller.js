const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const User = require("../models").User;
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const errorHandler = require("../utils/errorHandler");

module.exports = {
  async changeName(req, res) {
    try {
      const client = await User.findOne({ where: { id: req.body.id } });
      await client.update({ name: req.body.name });

      res.status(200).send({
        id: client.id,
        email: client.email,
        type: client.type,
        avatar: client.avatar,
        name: client.name,
        description: client.description,
      });
    } catch (error) {
      console.log(error);
    }
  },

  async changeDescription(req, res) {
    try {
      const client = await User.findOne({ where: { id: req.body.id } });
      await client.update({ description: req.body.description });

      res.status(200).send({
        id: client.id,
        email: client.email,
        type: client.type,
        avatar: client.avatar,
        name: client.name,
        description: client.description,
      });
    } catch (error) {
      console.log(error);
    }
  },

  async setAddress(req, res) {
    try {
      res.status(200).send("Address was added");
    } catch (error) {
      console.log(error);
    }
  },
};
