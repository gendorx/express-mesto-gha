const express = require('express');
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const { NotFound } = require('../utils/errors');

const router = express.Router();

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

router.all('*', (req, res, next) => {
  next(NotFound('неверный адрес запроса'));
});

module.exports = router;
