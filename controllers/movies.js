const moviesRouter = require('express').Router()
const Movie = require('../models/movie')

/*
  Get details about a movie by its imdb id.
  Example: /api/movies/tt0079944
*/
moviesRouter.get('/:id', async (req, res) => {
  const movie = await Movie
    .findOne({ imdbId: req.params.id })
    .populate({
      path: 'ratings',
      populate: {
        path: 'user',
        select: {
          username: 1,
          _id: 0
        }
      },
      select: {
        user: 1,
        rating: 1,
        _id: 0
      }
    })
    .lean()
    .exec()
  if (movie) {
    res.json(movie)
  } else {
    res.status(404).end()
  }
})

module.exports = moviesRouter