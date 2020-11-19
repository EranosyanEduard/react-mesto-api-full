class ForbiddenError extends Error {
  constructor(props) {
    super(props);
    this.name = 'ForbiddenError';
    this.statusCode = 403;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

class UnauthorizedError extends Error {
  constructor(props) {
    super(props);
    this.name = 'UnauthorizedError';
    this.statusCode = 401;
  }
}

module.exports = {
  ForbiddenError,
  NotFoundError,
  UnauthorizedError
};
