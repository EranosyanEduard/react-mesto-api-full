const { Schema, model } = require('mongoose');
const validator = require('validator');

const cardSchema = new Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (url) => validator.isURL(url),
      message: 'невалидное значение поля схемы cardSchema'
    }
  },
  owner: {
    type: Schema.Types.ObjectID,
    ref: 'user',
    required: true
  },
  likes: [{
    type: Schema.Types.ObjectID,
    ref: 'user',
    default: []
  }],
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = model('card', cardSchema);
