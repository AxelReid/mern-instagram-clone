const mongoose = require('mongoose')

const connectDB = (db_uri) => {
  return mongoose.connect(db_uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
}

module.exports = connectDB
