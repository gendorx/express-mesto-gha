const { urlRegex } = require('./constants');

function validateUrl(str) {
  return urlRegex.test(str);
}

module.exports = { validateUrl };
