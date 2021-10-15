module.exports = {
  async getComparedParts(req, res) {
    try {
      res.status(200).send({ message: 'compared parts' });
    } catch (err) {
      console.log(err);
      res.status(404).send(err.message);
    }
  },
};
