const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const vanBuddyRequestSchema = new mongoose.Schema({
  approval: {
    type: String,
    default: 'Pending',
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: {
      maxDepth: 1,
    },
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: {
      maxDepth: 1,
    },
  },
})

vanBuddyRequestSchema.plugin(autopopulate)
module.exports = mongoose.model('VanBuddyRequest', vanBuddyRequestSchema)
