const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const celebrate = require('celebrate');
const cors = require('cors');
const dotenv = require('dotenv');
const { createUser, login } = require('./controllers/users');
const { NotFoundError } = require('./errors/errors');
const {
  celebrateUserCreation,
  celebrateUserLogin,
  celebrateUserAuthorization
} = require('./middlewares/validator');
const { errorLogger, requestLogger } = require('./middlewares/logger');

dotenv.config();
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
app.use(requestLogger);
app.use(cors({
  origin: /^https?:\/{2}(w{3}\.)?mesto.ered.students.nomoreparties.co$/,
  optionsSuccessStatus: 200
}));
// unprotected routes:
app.post('/signin', celebrateUserLogin(), login);
app.post('/signup', celebrateUserCreation(), createUser);
// protected routes:
app.use(celebrateUserAuthorization(), require('./middlewares/auth'));
app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));
// undefined routes:
app.all('*', (req, res, next) => {
  next(new NotFoundError('Данный ресурс не найден!'));
});

app.use(errorLogger);

app.use(celebrate.errors());
// error general handler:
app.use(require('./middlewares/error'));

app.listen(PORT, () => {
  console.log('Сервер запущен');
});
