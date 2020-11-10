require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
const SECRET = process.env.SECRET
const OMDB_API_KEY = process.env.OMDB_API_KEY

module.exports = {
  PORT,
  MONGODB_URI,
  SECRET,
  OMDB_API_KEY
}
