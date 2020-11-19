require('dotenv')
  .config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { createUser, login } = require('./controllers/users');
const { NotFoundError } = require('./errors/errors');

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
// undefined route:
app.all('*', (req, res, next) => {
  next(new NotFoundError('Данный ресурс не найден!'));
});

// error general handler:
app.use(require('./middlewares/error'));

app.listen(PORT, () => {
  console.log('Сервер запущен');
});
