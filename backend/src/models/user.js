const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')
const passportLocalMongoose = require('passport-local-mongoose')
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
  vanBuddyAvailability: {
    type: Boolean,
    default: false,
  },
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
  sentBookRequests: [
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
  async createVan(information) {
    const { type, location, price } = information
    const van = await Van.create({ type, location, price, owner: this })

    this.listings.push(van)

    await this.save()
    return van
  }

  async createBookRequest(van) {
    if (!van.availability) throw new Error('This van is not available.')
    if (this._id.equals(van.owner._id)) throw new Error("You can't book your own van!")
    const bookRequest = await BookRequest.create({ van, customer: this })

    this.sentBookRequests.push(bookRequest)
    van.bookRequests.push(bookRequest)

    await this.save()
    await van.save()
    return bookRequest
  }

  async rentVan(van, bookRequest) {
    if (!bookRequest.approval) throw new Error("You need owner's approval to rent this van.")

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

  async createVanBuddyRequest(receiver) {
    const vanBuddyRequest = await VanBuddyRequest.create({ sender: this, receiver })

    this.vanBuddyRequests.push(vanBuddyRequest)
    receiver.vanBuddyRequests.push(vanBuddyRequest)

    await this.save()
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
userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
})
userSchema.index({ email: 1 }, { unique: true })
module.exports = mongoose.model('User', userSchema)
