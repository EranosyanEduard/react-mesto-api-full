const handleError = (error, _, response) => {
  const { status = 500, message } = error;
  response
    .status(status)
    .send({
      message: (status !== 500)
        ? message
        : 'На сервере произошла непредвиденная ошибка!'
    });
};

module.exports = handleError;
