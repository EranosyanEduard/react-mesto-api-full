const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { NotFoundError } = require('../errors/errors');

const createUser = (request, response, next) => {
  const { password, link, ...otherProps } = request.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      password: hash,
      avatar: link,
      ...otherProps
    }))
    .then((user) => User.findById(user._id))
    .then((user) => {
      response.send(user);
    })
    .catch(next);
};

const getCurrentUser = (request, response, next) => {
  User.findById(request.user._id)
    .orFail(() => new NotFoundError('Пользователь не найден!'))
    .then((user) => {
      response.send(user);
    })
    .catch(next);
};

const getUsers = (_, response, next) => {
  User.find({})
    .then((users) => {
      response.send(users);
    })
    .catch(next);
};

const login = (request, response, next) => {
  User.findUserByCredentials(request.body)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '7d' }
      );
      response.send({ token });
    })
    .catch(next);
};

const handleUpdateUser = (userId, updateObject, response) => (
  User.findByIdAndUpdate(userId, updateObject, {
    new: true,
    runValidators: true
  })
    .orFail(() => new NotFoundError('Пользователь не найден!'))
    .then((user) => {
      response.send(user);
    })
);

const updateAvatar = (request, response, next) => {
  handleUpdateUser(
    request.user._id,
    { avatar: request.body.link },
    response
  )
    .catch(next);
};

const updateUser = (request, response, next) => {
  const { name, about } = request.body;
  handleUpdateUser(
    request.user._id,
    {
      name,
      about
    },
    response
  )
    .catch(next);
};

module.exports = {
  createUser,
  getCurrentUser,
  getUsers,
  login,
  updateAvatar,
  updateUser
};
