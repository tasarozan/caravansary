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
    await van.save()
    return van
  }

  async createBookRequest(van) {
    if (!van.availability) throw new Error('This van is not available.')
    const bookRequest = await BookRequest.create({ van, customer: this })

    this.bookRequests.push(bookRequest)
    van.owner.bookRequests.push(bookRequest)

    await this.save()
    await bookRequest.save()
    await van.owner.save()
    return bookRequest
  }

  async respondToBookRequest(bookRequest, approvalStatus) {
    if (this != bookRequest.van.owner) throw new Error('You need to be owner of the van in order to approve booking.')

    if (approvalStatus) {
      bookRequest.toggleBookRequestApprovalStatus()

      console.log('Your book request approved. You can rent this van now.')
    }

    await this.save()
  }

  async rentVan(van, requestNumber) {
    if (!van.owner.bookRequests[requestNumber].isApproved)
      throw new Error("You need owner's approval to rent this van.")

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

  async createVanBuddyRequest(user) {
    const vanBuddyRequest = await VanBuddyRequest.create({ customer: this })

    this.vanBuddyRequests.push(vanBuddyRequest)
    user.vanBuddyRequests.push(vanBuddyRequest)

    await this.save()
    await vanBuddyRequest.save()
    await user.save()
    return vanBuddyRequest
  }

  async respondToVanBuddyRequest(vanBuddyRequest, approvalStatus) {
    if (approvalStatus) {
      vanBuddyRequest.toggleVanBuddyRequestApprovalStatus()
      console.log(
        `Congrats!!! You just became van buddies with ${this.vanBuddyRequest.sender.firstName} ${this.vanBuddyRequest.sender.lastName}`
      )
    }
    await this.save()
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
