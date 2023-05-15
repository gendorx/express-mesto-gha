const {
  constants: { HTTP_STATUS_INTERNAL_SERVER_ERROR },
} = require('http2');

// eslint-disable-next-line no-unused-vars
async function handleError(err, _req, res, _next) {
  let { message, statusCode } = err;

  if (!statusCode) {
    statusCode = HTTP_STATUS_INTERNAL_SERVER_ERROR;
    message = 'Внутренняя ошибка сервера';
  }

  res.status(statusCode).send({ message });
}

module.exports = handleError;
