const router = require('express').Router()
const User = require('../model/User')

const allPosts = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id })
    if (!user) return res.status(400).send('no user found')
    res.status(200).json(user.posts)
  } catch (error) {
    res.status(500).send(error)
  }
}
const createPost = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { posts: req.body },
      { new: true, runValidators: true }
    )
    if (!user) return res.status(404).send('User not found')
    res.status(200).json(user)
  } catch (error) {
    res.status(500).send(error)
  }
}

router.get('/all/:id', allPosts).patch('/create/:id', createPost)

module.exports = router
