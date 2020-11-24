const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors/errors');

function authorizeUser(req, _, next) {
  const { authorization } = req.headers;
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
  req.user = payload;
  next();
}

module.exports = authorizeUser;
