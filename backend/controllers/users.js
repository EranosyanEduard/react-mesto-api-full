const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { DuplicateKeyError, NotFoundError } = require('../errors/errors');

const createUser = (req, res, next) => {
  const { password, link, ...otherProps } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => (
      User.create({
        password: hash,
        avatar: link,
        ...otherProps
      })
        .then((user) => user)
        .catch(() => (
          Promise.reject(new DuplicateKeyError('Пользователь уже зарегистрирован!'))
        ))
    ))
    .then((user) => User.findById(user._id))
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => new NotFoundError('Пользователь не найден!'))
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

const getUsers = (_, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(next);
};

const login = (req, res, next) => {
  User.findUserByCredentials(req.body)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '7d' }
      );
      res.send({ token });
    })
    .catch(next);
};

const handleUpdateUser = (userId, updateObject, res) => (
  User.findByIdAndUpdate(userId, updateObject, {
    new: true,
    runValidators: true
  })
    .orFail(() => new NotFoundError('Пользователь не найден!'))
    .then((user) => {
      res.send(user);
    })
);

const updateAvatar = (req, res, next) => {
  handleUpdateUser(
    req.user._id,
    { avatar: req.body.link },
    res
  )
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  handleUpdateUser(
    req.user._id,
    { name, about },
    res
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
