const errorGeneralHandler = (error, request, response, _) => {
  const { message, name, statusCode = 500 } = error;
  const errorMessage = (statusCode !== 500)
    ? message
    : 'На сервере произошла непредвиденная ошибка!';
  response
    .status(statusCode)
    .send({
      errorName: name,
      errorMessage
    });
};

module.exports = errorGeneralHandler;
