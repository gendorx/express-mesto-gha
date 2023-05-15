const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userScheme = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 30,
    minlength: 2,
    default: 'Жак-Ив Кусто',
  },
  email: {
    type: String,
    validate: isEmail,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  about: {
    type: String,
    maxlength: 30,
    minlength: 2,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default:
      'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
});

module.exports = mongoose.model('user', userScheme);
