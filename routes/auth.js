const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { validationEmail, validatonUrl } = require('../utils/utils');

const { createUser, loginUser } = require('../controllers/auth');

const auth = express.Router();

const authFields = {
  email: Joi.string().required().custom(validationEmail),
  password: Joi.string().required(),
};

auth.post(
  '/signup',
  celebrate({
    body: {
      ...authFields,
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().custom(validatonUrl),
    },
  }),
  createUser,
);
auth.post('/signin', celebrate({ body: authFields }), loginUser);

module.exports = auth;
