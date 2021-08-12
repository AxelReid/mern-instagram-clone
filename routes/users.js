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
  const { username, password } = req.body
  // username exists?
  const user = await User.findOne({ username: username })
  if (!user) return res.status(400).send('User does not exist!')
  // compare password
  const validPass = await (password === user.password)
  if (!validPass) return res.status(400).send('password is wrong')
  const token = jwt.sign(
    { id: user._id },
    process.env.TOKEN_SECRET,
    { expiresIn: 72000 } // an hour
  )
  res.header('auth_token', token).json({ msg: 'Logged in!', id: user._id })
}
// EDIT ACCOUNT
const edit = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      {
        new: true,
        runValidators: true,
      }
    )
    if (!user) return res.status(404).send('User not found')
    res.status(200).json({ msg: 'Account Updated', data: user })
  } catch (error) {
    res.status(500).send(error)
  }
}
// EDIT PASSWORD
const edit_password = async (req, res) => {
  const { id } = req.params
  const { old_password, new_password } = req.body
  const user = await User.findOne({ _id: id })
  if (!user) return res.status(404).send('No user found')
  // compare pass
  if (user.password !== old_password)
    return res.status(400).send('Incorrect old password')
  try {
    await user.updateOne(
      { $set: { password: new_password } },
      {
        new: true,
        runValidators: true,
      }
    )
    const got_user = await User.findOne({ _id: id })
    res.status(200).json({ msg: 'Password changed!', data: got_user })
  } catch (error) {
    res.status(500).send(error)
  }
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
  .patch('/edit/:id', edit)
  .patch('/password/edit/:id', edit_password)
  .delete('/delete/:id', remove)

module.exports = router
