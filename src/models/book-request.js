const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const bookRequestSchema = new mongoose.Schema({
  van: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Van',
    required: true,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: true,
    required: true,
  },
})

class BookRequest {
  async toggleBookRequestApprovalStatus() {
    this.isApproved = !this.isApproved

    await this.save()
  }
}

bookRequestSchema.loadClass(BookRequest)
bookRequestSchema.plugin(autopopulate)
module.exports = mongoose.model('BookRequest', bookRequestSchema)
