require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { createUser, login } = require('./controllers/users');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// unprotected routes:
app.post('/signin', login);
app.post('/signup', createUser);
// protected routes:
app.use(require('./middlewares/auth'));
app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));

app.use((_, response) => {
  response.status(404).send({ message: 'Данный ресурс не найден!' });
});

app.listen(PORT);
