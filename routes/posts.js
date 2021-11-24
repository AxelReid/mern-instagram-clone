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
const addComment = async (req, res) => {
  const { id: user_ID } = req.params
  const { post_ID, name, comment, date } = req.body
  try {
    const user = await User.findOneAndUpdate(
      { _id: user_ID, 'posts.id': post_ID },
      {
        $push: {
          'posts.$.comments': { name: name, comment: comment, date: date },
        },
      },
      { new: true, runValidators: true }
    )
    if (user) res.status(200).send('new comment added')
  } catch (error) {
    res.status(500).send(error)
  }
}

router
  .get('/all/:id', allPosts)
  .patch('/create/:id', createPost)
  .patch('/comments/add/:id', addComment)

module.exports = router
