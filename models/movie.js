const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')


const movieSchema = new mongoose.Schema({
  imdbId: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  avgRating: Number,
  numRatings: {
    type: Number,
    default: 0
  },
  genre: [
    {
      type: String
    }
  ],
  releaseDate: {
    type: Date,
  },
  ratings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Rating'
    }
  ]
})

movieSchema.plugin(uniqueValidator)

movieSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie