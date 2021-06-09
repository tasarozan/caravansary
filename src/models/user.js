const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')
const Van = require('./van')

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
      autopopulate: true,
    },
  ],
  vanBuddyRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      autopopulate: true,
    },
  ],
  bookRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      autopopulate: true,
    },
  ],
})
class User {
  async createVan(type, make, model, year, berths, location, price) {
    const van = await Van.create({ type, make, model, year, berths, location, price })

    this.listings.push(van)

    await this.save()
    await van.save()
    return van
  }

  async bookVan(van) {
    if (!van.availability) throw new Error('Van already booked.')

    van.owner.bookRequests.push({ van, isApproved: false, customer: this })
    this.bookRequests.push({ van, isApproved: false, customer: this })

    await this.save()
    await van.save()
    console.log('Waiting for the owner approval.')
  }

  async respondBookRequest(van, requestNumber, approvalStatus) {
    if (this != van.owner) throw new Error('You need to be owner of the van in order to approve booking.')

    this.bookRequests[requestNumber].isApproved = approvalStatus
    this.bookRequests[requestNumber].customer.bookRequests.filter(x => x.van == van).isApproved = approvalStatus

    if (approvalStatus) console.log('Your book request approved. You can rent this van now.')

    console.log(
      this.bookRequests[requestNumber].isApproved ? 'You approved this book request.' : 'You denied this book request.'
    )
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

  async sendVanBuddyRequest(user) {
    this.vanBuddyRequests.push({ sender: this, receiver: user, isApproved: false })
    user.vanBuddyRequests.push({ sender: this, receiver: user, isApproved: false })

    await this.save()
    await user.save()
  }

  async respondVanBuddyRequest(requestNumber, approvalStatus) {
    this.vanBuddyRequests[requestNumber].isApproved = approvalStatus

    if (approvalStatus)
      console.log(
        `Congrats!!! You just became van buddies with ${this.vanBuddyRequests[requestNumber].sender.firstName} ${this.vanBuddyRequests[requestNumber].sender.lastName}`
      )

    console.log("Sorry :'(")

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
