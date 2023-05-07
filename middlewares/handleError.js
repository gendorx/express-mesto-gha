// eslint-disable-next-line no-unused-vars
async function handleError(err, _req, res, _next) {
  let { message, statusCode } = err;

  // eslint-disable-next-line no-console
  console.log(err);

  if (!statusCode) {
    statusCode = 500;
    message = 'Внутренняя ошибка сервера';
  }

  res.status(statusCode).send({ message });
}

module.exports = handleError;