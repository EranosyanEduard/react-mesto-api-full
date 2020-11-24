const { celebrate, Joi } = require('celebrate');
const urlPattern = /^https?:\/{2}(w{3}\.)?([a-z\d][\w-]+\.)+[a-z]+(\/.+)*$/;

const celebrateUserCreation = () => (
  celebrate({
    body: Joi
      .object()
      .keys({
        email: Joi
          .string()
          .required()
          .email(),
        password: Joi
          .string()
          .required()
          .token(),
        name: Joi
          .string()
          .min(2)
          .max(30),
        about: Joi
          .string()
          .min(2)
          .max(30),
        link: Joi
          .string()
          .pattern(urlPattern)
      })
  })
);

const celebrateUserLogin = () => (
  celebrate({
    body: Joi
      .object()
      .keys({
        email: Joi
          .string()
          .required()
          .email(),
        password: Joi
          .string()
          .required()
      })
  })
);

const celebrateUserAuthorization = () => (
  celebrate({
    headers: Joi
      .object()
      .keys({
        authorization: Joi
          .string()
          .required()
      })
      .unknown()
  })
);

const celebrateUserUpdate = () => (
  celebrate({
    body: Joi
      .object()
      .keys({
        name: Joi
          .string()
          .required()
          .min(2)
          .max(30),
        about: Joi
          .string()
          .required()
          .min(2)
          .max(30)
      })
  })
);

const celebrateAvatarUpdate = () => (
  celebrate({
    body: Joi
      .object()
      .keys({
        link: Joi
          .string()
          .required()
          .pattern(urlPattern)
      })
  })
);

const celebrateCardCreation = () => (
  celebrate({
    body: Joi
      .object()
      .keys({
        name: Joi
          .string()
          .required()
          .min(2)
          .max(30),
        link: Joi
          .string()
          .required()
          .pattern(urlPattern)
      })
  })
);

const celebrateCardStateChanging = () => (
  celebrate({
    params: Joi
      .object()
      .keys({
        cardId: Joi
          .string()
          .hex()
          .length(24)
      })
  })
);

module.exports = {
  celebrateUserCreation,
  celebrateUserLogin,
  celebrateUserAuthorization,
  celebrateAvatarUpdate,
  celebrateUserUpdate,
  celebrateCardCreation,
  celebrateCardStateChanging
};
