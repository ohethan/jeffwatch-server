const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

/*
  Sign Up : Add new user
  returns 400 if username already exists or if email/password is invalid
*/
usersRouter.post('/', async (req, res) => {
  const body = req.body

  if (!body.username || !body.password) {
    return res.status(400).send({ message: 'email and password required' })
  }

  if (body.username.length < 3) {
    return res.status(400).send({ message: 'username must be longer than 2 characters' })
  }

  if (body.username.length > 20) {
    return res.status(400).send({ message: 'username must be 20 characters or less' })
  }

  if (!body.username.match('^[A-Za-z0-9]+$')) {
    return res.status(400).send({ message: 'username can only contain characters and numbers' })
  }

  if (body.password.length < 6) {
    return res.status(400).send({ message: 'password must be 6 characters or more' })
  }

  if (body.password.length > 50) {
    return res.status(400).send({ message: 'why is your password more than 50 characters...' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    passwordHash,
    createdOn: new Date()
  })

  const savedUser = await user.save()

  res.json(savedUser)
})

usersRouter.get('/:username', async (req, res) => {
  const user = await User
    .findOne({ username: req.params.username })
    .populate({
      path: 'ratings',
      populate: {
        path: 'movie',
        select: {
          imdbId: 1,
          title: 1,
          avgRating: 1,
          numRatings: 1,
          genre: 1,
          releaseDate: 1,
        }
      },
      select: {
        date: 1,
        rating: 1,
        movie: 1
      }
    })
    .exec()
  console.log(user)
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

module.exports = usersRouter