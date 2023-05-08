const {
  constants: { HTTP_STATUS_BAD_REQUEST },
} = require('http2');

class BadRequest extends Error {
  constructor(message) {
    super(message);

    this.statusCode = HTTP_STATUS_BAD_REQUEST;
  }
}

module.exports = BadRequest;
