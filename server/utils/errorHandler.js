module.exports = (res, error) => {
  res.status(500).json({
    success: false,
    message: error.messaage ? error.message : error,
  });
};
