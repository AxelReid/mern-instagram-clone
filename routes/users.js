const router = require('express').Router()
const User = require('../model/User')
const jwt = require('jsonwebtoken')

// GET A USER
const singleUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findOne({ _id: id })
    if (!user) return res.status(404).send('No user found')
    res.status(200).json(user)
  } catch (error) {
    res.status(500).send(error)
  }
}
// GET ALL USERS
const allUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).send(error)
  }
}
// CREATE AN ACCOUNT
const register = async (req, res) => {
  // check email exits
  const emailExists = await User.findOne({ email: req.body.email })
  if (emailExists) return res.status(400).send('Email is already in use!')
  const usernameExists = await User.findOne({ username: req.body.username })
  if (usernameExists) return res.status(400).send('Username is already in use!')
  try {
    const newUser = await User.create(req.body)
    const token = jwt.sign({ id: newUser._id }, process.env.TOKEN_SECRET, {
      expiresIn: 72000,
    })
    const { 'auth-token': gotToken } = req.headers
    console.log(gotToken)
    res
      .status(201)
      .header('auth_token', token)
      .json({ msg: 'Account created', data: newUser })
  } catch (error) {
    res.status(500).send(error)
  }
}
// LOGIN TO ACCOUNT
const login = async (req, res) => {
  res.send('Login')
}
// EDIT ACCOUNT
const edit = async (req, res) => {
  res.send('Edit')
}
// DELETE ACCOUNT
const remove = async (req, res) => {
  const { id } = req.params
  try {
    const removeUser = await User.findOneAndDelete({ _id: id })
    if (!removeUser) return res.status(404).send('No user found!')
    res.status(200).send('User deleted')
  } catch (error) {
    res.status(500).send(error)
  }
}

router
  .get('/all/:id', singleUser)
  .get('/all', allUsers)
  .post('/register', register)
  .post('/login', login)
  .patch('/edit', edit)
  .delete('/delete/:id', remove)

module.exports = router
