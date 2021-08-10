const express = require('express')
const app = express()
require('dotenv').config()
const connectDB = require('./db/connect')
const usersRoute = require('./routes/users')

app.use(express.json())
app.use('/api/user', usersRoute)

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI)
    app.listen(port, () => console.log('Server listening on port ' + port))
  } catch (error) {
    console.log(error)
  }
}
start()
