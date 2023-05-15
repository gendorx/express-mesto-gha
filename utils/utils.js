const validator = require('validator');
const { urlRegex } = require('./constants');

function validateUrl(str) {
  return urlRegex.test(str);
}

function validatonUrl(value) {
  const isUrl = validateUrl(value);

  if (!isUrl) throw new Error("it's not url");

  return value;
}

function validationEmail(value) {
  const isEmail = validator.isEmail(value);

  if (!isEmail) throw new Error("it's not email");

  return value;
}

module.exports = { validateUrl, validatonUrl, validationEmail };
