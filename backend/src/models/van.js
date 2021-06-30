const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const vanSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  make: String,
  model: String,
  year: Number,
  berths: Number,
  location: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: {
      maxDepth: 1,
    },
    required: true,
  },
  description: String,
  availability: {
    type: Boolean,
    default: true,
  },
  photos: Array,
  bookRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BookRequest',
      autopopulate: {
        maxDepth: 1,
      },
    },
  ],
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      autopopulate: true,
    },
  ],
})

class Van {
  async toggleAvailability() {
    this.availability = !this.availability
    await this.save()
  }

  async addPhoto(photo) {
    this.photos.push(photo)
    await this.save()
  }

  async addReview(text, reviewer, rating) {
    this.reviews.push({ text, reviewer, rating })
    await this.save()
  }

  async setLocation(customer) {
    this.location = customer.location
    await this.save()
  }
}

vanSchema.loadClass(Van)
vanSchema.plugin(autopopulate)
module.exports = mongoose.model('Van', vanSchema)
