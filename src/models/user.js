const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')
const Van = require('./van')
const BookRequest = require('./book-request')
const VanBuddyRequest = require('./van-buddy-request')

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  listings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Van',
      autopopulate: {
        maxDepth: 1,
      },
    },
  ],
  bio: String,
  rentHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Van',
      autopopulate: {
        maxDepth: 1,
      },
    },
  ],
  vanBuddyRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'VanBuddyRequest',
      autopopulate: {
        maxDepth: 1,
      },
    },
  ],
  bookRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BookRequest',
      autopopulate: {
        maxDepth: 1,
      },
    },
  ],
})
class User {
  async createVan(type, make, model, year, berths, location, price) {
    const van = await Van.create({ type, make, model, year, berths, location, price, owner: this })

    this.listings.push(van)

    await this.save()
    return van
  }

  async createBookRequest(van, customer) {
    if (!van.availability) throw new Error('This van is not available.')
    const bookRequest = await BookRequest.create({ van, customer })

    customer.bookRequests.push(bookRequest)
    van.owner.bookRequests.push(bookRequest)

    await customer.save()
    await van.owner.save()
    return bookRequest
  }

  async rentVan(van, bookRequest) {
    if (!bookRequest.isApproved) throw new Error("You need owner's approval to rent this van.")

    van.toggleAvailability()
    this.rentHistory.push(van)

    console.log(`You successfully rented ${van.owner.firstName} ${van.owner.lastName}'s van.`)

    await this.save()
    await van.save()
  }

  async returnVan(van) {
    van.toggleAvailability()
    van.setLocation(van.owner)

    await van.save()
  }

  async createVanBuddyRequest(receiver, sender) {
    const vanBuddyRequest = await VanBuddyRequest.create({ sender, receiver })

    sender.vanBuddyRequests.push(vanBuddyRequest)
    receiver.vanBuddyRequests.push(vanBuddyRequest)

    await sender.save()
    await receiver.save()
    return vanBuddyRequest
  }

  async reviewVan(text, van, rating) {
    if (this.listings.includes(van)) throw new Error("You can't add review to your vans.")
    if (!this.rentHistory.includes(van)) throw new Error('First you need to rent this van.')
    van.addReview(text, this, rating)

    await this.save()
    await van.save()
  }
}

userSchema.loadClass(User)
userSchema.plugin(autopopulate)
module.exports = mongoose.model('User', userSchema)
