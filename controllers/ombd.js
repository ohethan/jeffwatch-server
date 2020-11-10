const config = require('../utils/config')
const axios = require('axios')
const omdbRouter = require('express').Router()

omdbRouter.get('/search/:query', async (req, res) => {
  const url = `http://www.omdbapi.com/?s=${req.params.query}&apikey=${config.OMDB_API_KEY}`
  const result = await axios.get(url)
  res.json(result.data)
})

omdbRouter.get('/:id', async (req, res) => {
  const url = `http://www.omdbapi.com/?i=${req.params.id}&apikey=${config.OMDB_API_KEY}`
  const result = await axios.get(url)
  res.json(result.data)
})

module.exports = omdbRouter