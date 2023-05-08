const {
  constants: { HTTP_STATUS_NOT_FOUND },
} = require('http2');

class NotFound extends Error {
  constructor(message) {
    super(message);

    this.statusCode = HTTP_STATUS_NOT_FOUND;
  }
}

module.exports = NotFound;
