'use strict';

const sequelize = require('sequelize');

const scheme = {
  type: sequelize.DataTypes.STRING,
  email: sequelize.DataTypes.STRING,
  password: sequelize.DataTypes.STRING,
  registratedAt: sequelize.DataTypes.DATE,
  lastVisitAt: sequelize.DataTypes.DATE,
  token: sequelize.DataTypes.STRING,
  avatar: sequelize.DataTypes.STRING,
  name: sequelize.DataTypes.STRING,
  description: sequelize.DataTypes.STRING,
};

module.exports = (sequelize) => {
  let User = sequelize.define('User', scheme);

  return User;
};
