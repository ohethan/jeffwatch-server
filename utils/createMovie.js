const config = require('./config')
const axios = require('axios')
const Movie = require('../models/movie')
const logger = require('./logger')

const createMovie = async (imdbId) => {
  try {
    const url = `http://www.omdbapi.com/?i=${imdbId}&apikey=${config.OMDB_API_KEY}`
    const result = await axios
      .get(url)

    if (result.data.Response === 'False') {
      return false
    }

    const genre = result.data.Genre.split(', ')

    let dateTimestamp = Date.parse(result.data.Released)
    let releaseDate = undefined
    if (!isNaN(dateTimestamp)) {
      releaseDate = new Date(dateTimestamp)
    } else {
      dateTimestamp = Date.parse(result.data.Year)
      if (!isNaN(dateTimestamp)) {
        releaseDate = new Date(dateTimestamp)
      }
    }

    const movie = new Movie({
      imdbId: imdbId,
      title: result.data.Title,
      genre: genre,
      releaseDate: releaseDate
    })

    await movie.save()
    return movie
  } catch (e) {
    logger.error(e)
    return false
  }
}

module.exports = createMovie