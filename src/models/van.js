const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const vanSchema = new mongoose.Schema({
  type: String,
  make: String,
  model: String,
  year: Number,
  berths: Number,
  location: String,
  price: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: true,
  },
  description: String,
  availability: Boolean,
  photos: Array,
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
