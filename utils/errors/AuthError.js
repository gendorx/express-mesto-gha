const {
  constants: { HTTP_STATUS_UNAUTHORIZED },
} = require('http2');

class AuthError extends Error {
  constructor(message) {
    super(message);

    this.statusCode = HTTP_STATUS_UNAUTHORIZED;
  }
}

module.exports = AuthError;
