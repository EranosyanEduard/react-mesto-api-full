const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const { UnauthorizedError } = require('../errors/errors');

const userSchema = new Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: 2,
    maxlength: 30
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (url) => validator.isURL(url),
      message: 'невалидное значение поля схемы userSchema'
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'невалидное значение поля схемы userSchema'
    }
  },
  password: {
    type: String,
    required: true,
    select: false
  }
});

userSchema.statics.findUserByCredentials = function ({ email, password }) {
  const errorMessage = 'Недопустимое значение одного из полей!';
  return this.findOne({ email })
    .select('+password')
    .orFail(() => new UnauthorizedError(errorMessage))
    .then((user) => (
      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (matched) {
            return user;
          }
          return Promise.reject(new UnauthorizedError(errorMessage));
        })
    ));
};

module.exports = model('user', userSchema);
