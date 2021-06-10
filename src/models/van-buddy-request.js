const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const vanBuddyRequestSchema = new mongoose.Schema({
  isApproved: {
    type: Boolean,
    default: false,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: true,
  },
})

class VanBuddyRequest {
  async toggleVanBuddyRequestApprovalStatus() {
    this.isApproved = !this.isApproved

    await this.save()
  }
}

vanBuddyRequestSchema.loadClass(VanBuddyRequest)
vanBuddyRequestSchema.plugin(autopopulate)
module.exports = mongoose.model('VanBuddyRequest', vanBuddyRequestSchema)
