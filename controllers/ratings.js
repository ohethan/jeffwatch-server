const ratingsRouter = require('express').Router()
const Rating = require('../models/rating')
const Movie = require('../models/movie')
const createMovie = require('../utils/createMovie')
const middleware = require('../utils/middleware')

ratingsRouter.post('/', middleware.protect, async (req, res) => {
  const body = req.body
  if (!body.rating || !body.movie) {
    return res.status(400).end()
  }
  const user = req.user

  let movie = await Movie.findOne({ imdbId: body.movie }).exec()

  if (!movie) {
    movie = await createMovie(body.movie)
    if (!movie) {
      return res.status(400).end()
    }
  }

  const existingRating = await Rating.findOne()
    .where({ user: user._id })
    .where({ movie: movie._id })
    .exec()

  if (existingRating) {
    return res.status(400).send({ message: 'Rating already exists. Use PUT to update rating' })
  }

  const rating = new Rating({
    date: new Date(),
    user: user._id,
    movie: movie._id,
    rating: body.rating
  })


  const savedRating = await rating.save()
  user.ratings = user.ratings.concat(savedRating._id)
  await user.save()
  movie.ratings = movie.ratings.concat(savedRating._id)
  if (movie.avgRating) {
    movie.avgRating = ((movie.avgRating * movie.numRatings) + body.rating) / (movie.numRatings + 1)
  } else movie.avgRating = body.rating
  movie.numRatings = movie.numRatings + 1
  await movie.save()

  res.json(savedRating)
})

ratingsRouter.put('/', middleware.protect, async (req, res) => {
  const body = req.body
  const user = req.user

  if (!body.rating || !body.movie) {
    return res.status(400).end()
  }

  let movie = await Movie.findOne({ imdbId: body.movie }).exec()

  if(!movie || !movie.avgRating) {
    return res.status(400).end()
  }

  const existingRating = await Rating.findOne()
    .where({ user: user._id })
    .where({ movie: movie._id })
    .exec()

  if(!existingRating) {
    return res.status(400).end()
  }

  const oldRating = existingRating.rating

  existingRating.rating = body.rating

  const savedRating = await existingRating.save()

  movie.avgRating = ((movie.avgRating * movie.numRatings) - oldRating + body.rating) / movie.numRatings
  await movie.save()

  res.json(savedRating)
})

ratingsRouter.delete('/', middleware.protect, async (req, res) => {
  const body = req.body
  const user = req.user

  if (!body.movie) {
    return res.status(400).end()
  }

  let movie = await Movie.findOne({ imdbId: body.movie }).exec()

  if(!movie) {
    return res.status(204).end()
  }

  const rating = await Rating.findOne()
    .where({ user: user._id })
    .where({ movie: movie._id })
    .exec()

  if (!rating) {
    return res.status(204).end()
  }

  movie.ratings.pull({ _id: rating._id })
  movie.numRatings = movie.numRatings - 1
  if (movie.numRatings <= 0) {
    movie.avgRating = undefined
    movie.numRatings = 0
  } else {
    movie.avgRating = ((movie.avgRating * (movie.numRatings + 1)) - rating.rating) / movie.numRatings
  }
  console.log(rating)
  await movie.save()
  user.ratings.pull({ _id: rating.id })
  await user.save()
  await rating.remove()
  res.status(204).end()
})

ratingsRouter.get('/:id', middleware.protect, async (req, res) => {
  const movieId = req.params.id
  const user = req.user

  if (!movieId) {
    return res.status(400).end()
  }

  let movie = await Movie.findOne({ imdbId: movieId }).exec()

  if(!movie) {
    return res.status(204).end()
  }

  const rating = await Rating.findOne()
    .where({ user: user._id })
    .where({ movie: movie._id })
    .exec()

  if (rating) {
    res.json(rating)
  } else {
    res.status(204).end()
  }
})

module.exports = ratingsRouter