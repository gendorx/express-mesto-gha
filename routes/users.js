const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { validateUrl } = require('../utils/utils');

const users = express.Router();
const {
  getAllUsers,
  getUserById,
  updateUserInfo,
  updateUserAvatar,
  getCurrentUser,
} = require('../controllers/users');

function urlValidate(value) {
  const isUrl = validateUrl(value);

  if (!isUrl) throw new Error("it's not url");

  return value;
}

users.get('/', getAllUsers);
users.get('/me', getCurrentUser);
users.get(
  '/:userId',
  celebrate({
    params: { userId: Joi.string().required().alphanum().length(24) },
  }),
  getUserById,
);
users.patch(
  '/me',
  celebrate({
    body: {
      about: Joi.string().required().min(2).max(30),
      name: Joi.string().required().min(2).max(30),
    },
  }),
  updateUserInfo,
);
users.patch(
  '/me/avatar',
  celebrate({ body: { avatar: Joi.string().required().custom(urlValidate) } }),
  updateUserAvatar,
);

module.exports = users;
