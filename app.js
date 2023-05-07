const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const router = require('./routes');
const handleError = require('./middlewares/handleError');

const app = express();

const { PORT = 3000, DATABASE_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
});

// Middlewares

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((req, _res, next) => {
  req.user = {
    _id: '6452695a3f51d2e294eaef7c',
  };

  next();
});

app.use(router);
app.use(handleError);

app.listen(PORT);
