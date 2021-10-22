const User = require('../models').User;
const static = require('../config/static');
const Uuid = require('uuid');
const fs = require('fs');

module.exports = {
  async uploadAvatar(req, res) {
    try {
      const file = req.files.file;
      const user = await User.findOne({ where: { id: req.user.id } });
      const avatarName = Uuid.v4() + '.jpg';
      file.mv(static.staticPath + '\\' + avatarName);
      user.avatar = avatarName;
      await user.save();
      return res.send(user);
    } catch (err) {
      console.error(err);
      return res.status(404).send({ message: 'Avatar uploading error' });
    }
  },

  async deleteAvatar(req, res) {
    try {
      const user = await User.findOne({ where: { id: req.user.id } });
      fs.unlinkSync(static.staticPath + '\\' + user.avatar);
      user.avatar = null;
      await user.save();
      return res.send(user);
    } catch (err) {
      console.error(err);
      return res.status(404).send({ message: 'Avatar deleting error' });
    }
  },
};
