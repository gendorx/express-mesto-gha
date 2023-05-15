const express = require('express');
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const authRouter = require('./auth');
const { NotFound } = require('../utils/errors');
const authHandler = require('../middlewares/authHandler');

const router = express.Router();

router.use(authRouter);

router.use('/users', authHandler, usersRouter);
router.use('/cards', authHandler, cardsRouter);

router.all('*', (req, res, next) => {
  next(new NotFound('неверный адрес запроса'));
});

module.exports = router;
