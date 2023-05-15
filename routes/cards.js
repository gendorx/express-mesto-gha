const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { validatonUrl } = require('../utils/utils');
const {
  createCard,
  getCards,
  removeLike,
  addLike,
  removeCard,
} = require('../controllers/cards');

const cards = express.Router();

cards.get('/', getCards);
cards.post(
  '/',
  celebrate({
    body: {
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().custom(validatonUrl),
    },
  }),
  createCard,
);
cards.delete(
  '/:cardId',
  celebrate({
    params: { cardId: Joi.string().required().alphanum().length(24) },
  }),
  removeCard,
);
cards.put(
  '/:cardId/likes',
  celebrate({
    params: { cardId: Joi.string().required().alphanum().length(24) },
  }),
  addLike,
);
cards.delete(
  '/:cardId/likes',
  celebrate({
    params: { cardId: Joi.string().required().alphanum().length(24) },
  }),
  removeLike,
);

module.exports = cards;
