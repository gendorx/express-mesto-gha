const express = require('express');
const {
  createCard,
  getCards,
  removeLike,
  addLike,
  removeCard,
} = require('../controllers/cards');

const cards = express.Router();

cards.get('/', getCards);
cards.post('/', createCard);
cards.delete('/:cardId', removeCard);
cards.put('/:cardId/likes', addLike);
cards.delete('/:cardId/likes', removeLike);

module.exports = cards;
