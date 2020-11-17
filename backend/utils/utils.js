const DocumentNotFoundError = class extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
  }
};

const handleError = (error, response) => {
  const errorCode = {
    DocumentError: 404,
    ValidationError: 400
  };
  response
    .status(errorCode[error.name] || 500)
    .send({ errorName: error.name, errorMessage: error.message });
};

module.exports = {
  DocumentNotFoundError,
  handleError
};
