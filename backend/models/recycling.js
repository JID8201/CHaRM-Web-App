const mongoose = require('mongoose')

const RecycledItemSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  notes: {
    type: String,
    required: false
  }
})
const RecyclingSchema = new mongoose.Schema({
  items: {
    type: [RecycledItemSchema],
    required: true
  },
  zip: {
    type: Number,
    min: 0o0000,
    max: 99999,
    required: true
  }
}, {
  timestamps: {
    createdAt: 'created_at'
  }
})

module.exports = mongoose.model('Recycling', RecyclingSchema)
