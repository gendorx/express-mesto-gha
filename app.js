const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const router = require('./routes');
const handleError = require('./middlewares/handleError');

const app = express();

const { PORT = 3000, DATABASE_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
});

// Middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(router);
app.use(errors());
app.use(handleError);

app.listen(PORT);
