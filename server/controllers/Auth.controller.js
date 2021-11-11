const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const User = require('../models').User;
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const errorHandler = require('../utils/errorHandler');

module.exports = {
  async login(req, res) {
    const client = await User.findOne({ where: { email: req.body.email } });

    if (client) {
      const isPasswordValid = bcrypt.compareSync(
        req.body.password,
        client.password
      );

      if (isPasswordValid) {
        const token = jwt.sign(
          {
            email: client.email,
            id: client.id,
          },
          keys.jwt,
          { expiresIn: 7200 }
        );
        await client.update({
          lastVisitAt: new Date(),
          token: token,
        });
        res.status(200).send({
          token: `Bearer ${token}`,
          user: {
            id: client.id,
            email: client.email,
            type: client.type,
            avatar: client.avatar,
            name: client.name,
            description: client.description,
          },
        });
      }

      if (!isPasswordValid) {
        res.status(401).send({ message: 'Неверный пароль' });
      }
    }

    if (!client) {
      res.status(404).send({ message: 'Пользователь с таким email не найден' });
    }
  },

  async register(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Uncorrect request', errors });
      }
      const client = await User.findOne({
        where: { email: req.body.email },
      });

      if (client) {
        res.status(404).send({ message: 'Этот email уже занят' });
      }
      if (!client) {
        const password = req.body.password;
        const hashPassword = await bcrypt.hash(password, 8);
        const user = await User.create({
          email: req.body.email,
          password: hashPassword,
          type: req.body.type,
          name: req.body.name,
          registratedAt: new Date(),
          description: '',
        });
        res.status(201).send(user);
      }
    } catch (e) {
      errorHandler(res, e);
    }
  },

  async auth(req, res) {
    try {
      const client = await User.findOne({ where: { id: req.user.id } });
      const token = jwt.sign(
        {
          email: client.email,
          id: client.id,
        },
        keys.jwt,
        { expiresIn: 3600 }
      );

      return res.status(200).send({
        token: `Bearer ${token}`,
        user: {
          id: client.id,
          email: client.email,
          type: client.type,
          avatar: client.avatar,
          name: client.name,
          description: client.description,
        },
      });
    } catch (error) {
      console.error(error);
      res.send({ message: 'Server error' });
    }
  },
};
