const mongoose = require('mongoose')

const ratingSchema = new mongoose.Schema({
  date: {
    required: true,
    type: Date,
  },
  user: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  movie: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
  },
  rating: {
    required: true,
    type: Number,
    max: 10,
    min: 1,
  },
})

ratingSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Rating = mongoose.model('Rating', ratingSchema)

module.exports = Rating