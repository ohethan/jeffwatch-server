const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const path = require('path')
const app = express()
const cors = require('cors')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const chartsRouter = require('./controllers/charts')
const middleware = require('./utils/middleware')
const ratingsRouter = require('./controllers/ratings')
const moviesRouter = require('./controllers/movies')
const omdbRouter = require('./controllers/ombd')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch(error => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static(path.join(__dirname, 'build')))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/ratings', ratingsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/omdb', omdbRouter)
app.use('/api/movies', moviesRouter)
app.use('/api/charts', chartsRouter)

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'build/index.html')))
app.use(middleware.errorHandler)

module.exports = app