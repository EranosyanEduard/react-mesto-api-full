const jwt = require('jsonwebtoken');

const authorizeUser = (request, response, next) => {
  const { authorization } = request.headers;
  const tokenSchemePattern = /^Bearer /;
  const errorProps = {
    status: 401,
    message: { error: 'Ошибка авторизации!' }
  };
  if (!tokenSchemePattern.test(authorization)) {
    response
      .status(errorProps.status)
      .send(errorProps.message);
    return;
  }
  const token = authorization.replace(tokenSchemePattern, '');
  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (error) {
    response
      .status(errorProps.status)
      .send(errorProps.message);
    return;
  }
  request.user = payload;
  next();
};

module.exports = authorizeUser;
