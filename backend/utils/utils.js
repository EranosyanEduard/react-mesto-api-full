const DocumentNotFoundException = class extends Error {
  constructor(message) {
    super(message);
    this.name = 'DocumentError';
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
  DocumentNotFoundException,
  handleError
};
