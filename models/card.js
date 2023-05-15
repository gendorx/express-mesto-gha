const mongoose = require('mongoose');
const { validateUrl } = require('../utils/utils');

const cardScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 30,
    minlength: 2,
  },
  link: {
    type: String,
    required: true,
    validate: validateUrl,
  },
  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
      },
    ],
    default: [],
  },
});

module.exports = mongoose.model('card', cardScheme);
