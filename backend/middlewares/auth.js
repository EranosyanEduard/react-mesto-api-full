const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors/errors');

function authorizeUser(request, response, next) {
  const { authorization } = request.headers;
  const tokenSchemePattern = /^Bearer /;
  const authorizationError = new UnauthorizedError('Ошибка авторизации!');
  if (!tokenSchemePattern.test(authorization)) {
    next(authorizationError);
    return;
  }
  const token = authorization.replace(tokenSchemePattern, '');
  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (err) {
    next(authorizationError);
    return;
  }
  request.user = payload;
  next();
}

module.exports = authorizeUser;
