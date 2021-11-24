const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const connectDB = require('./db/connect')
const usersRoute = require('./routes/users')
const postsRoute = require('./routes/posts')

app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use('/api/user', usersRoute)
app.use('/api/posts', postsRoute)

const uri = process.env.MONGODB_URI
const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(uri, () => console.log('DB Connected'))
    app.listen(port, () => console.log('Server listening on port ' + port))
  } catch (error) {
    console.log(error)
  }
}
start()
