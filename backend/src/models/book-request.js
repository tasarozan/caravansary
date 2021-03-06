const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const bookRequestSchema = new mongoose.Schema({
  van: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Van',
    required: true,
  },
  approval: {
    type: String,
    default: 'Pending',
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: {
      maxDepth: 1,
    },
    required: true,
  },
})

bookRequestSchema.plugin(autopopulate)
module.exports = mongoose.model('BookRequest', bookRequestSchema)
