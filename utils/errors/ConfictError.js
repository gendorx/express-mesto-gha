const {
  constants: { HTTP_STATUS_CONFLICT },
} = require('http2');

class ConfictError extends Error {
  constructor(message) {
    super(message);

    this.statusCode = HTTP_STATUS_CONFLICT;
  }
}

module.exports = ConfictError;
