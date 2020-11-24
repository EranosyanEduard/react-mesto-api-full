function errorGeneralHandler(err, req, res, _) {
  const { message, name, statusCode = 500 } = err;
  const errorMessage = (statusCode !== 500)
    ? message
    : 'На сервере произошла непредвиденная ошибка!';
  res
    .status(statusCode)
    .send({
      errorName: name,
      errorMessage
    });
};

module.exports = errorGeneralHandler;
