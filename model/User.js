const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    min: 3,
    max: 200,
  },
  password: {
    type: String,
    required: true,
    min: 3,
    max: 200,
  },
  username: {
    type: String,
    required: true,
    min: 3,
    max: 10,
  },
  bio: {
    type: String,
    min: 3,
    max: 200,
  },
  followers: {
    type: Object,
    default: [],
  },
  followings: {
    type: Object,
    default: [],
  },
  posts: { type: Object, default: [] },
  date: { type: Date, default: Date.now },
})

module.exports = mongoose.model('User', userSchema)
