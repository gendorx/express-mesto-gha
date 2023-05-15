const {
  constants: { HTTP_STATUS_FORBIDDEN },
} = require('http2');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);

    this.statusCode = HTTP_STATUS_FORBIDDEN;
  }
}

module.exports = ForbiddenError;
