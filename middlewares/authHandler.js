const jwt = require('jsonwebtoken');
const { AuthError } = require('../utils/errors');

const { JWT_SECRET } = require('../utils/constants');

const authError = new AuthError('требуется авторизация');

function authHandler(req, res, next) {
  const { jwt: jwtCookie } = req.cookies;

  if (!jwtCookie) {
    next(authError);
    return;
  }

  try {
    const payload = jwt.verify(jwtCookie, JWT_SECRET);

    req.user = payload;
    next();
  } catch (err) {
    next(authError);
  }
}

module.exports = authHandler;
