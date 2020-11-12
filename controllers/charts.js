const chartsRouter = require('express').Router()
const Movie = require('../models/movie')
/*
  Default chart. Returns 50 highest rated movies.
  example: /api/charts/
*/
chartsRouter.get('/', async (req, res) => {
  const sort = req.query.sort
  const year = req.query.year
  const genre = req.query.genre // array!
  const page = req.query.page

  const movies = await Movie
    .find({})
    .sort('-avgRating')
    .limit(50)

  if (!movies) {
    res.status(404).send({ message: 'no movies found' })
  }

  res.json(movies)
})

module.exports = chartsRouter