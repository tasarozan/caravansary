const Van = require('./van')

class Person {
  listings = []

  bio = ''

  rentHistory = []

  bookRequests = []

  vanBuddyRequests = []

  constructor(firstName, lastName, age, location) {
    this.firstName = firstName
    this.lastName = lastName
    this.age = age
    this.location = location
  }

  createVan(type, make, model, year, berths, location, price) {
    const van = new Van(type, make, model, year, berths, location, price, this)

    this.listings.push(van)

    return van
  }

  bookVan(van) {
    if (!van.availability) throw new Error('Van already booked.')

    van.owner.bookRequests.push({ van, isApproved: false, customer: this, owner: van.owner })
    this.bookRequests.push({ van, isApproved: false, customer: this, owner: van.owner })

    console.log('Waiting for the owner approval.')
  }

  respondBookRequest(van, requestNumber, approvalStatus) {
    if (this != van.owner) throw new Error('You need to be owner of the van in order to approve booking.')

    this.bookRequests[requestNumber].isApproved = approvalStatus
    this.bookRequests[requestNumber].customer.bookRequests.filter(x => x.van == van).isApproved = approvalStatus

    if (approvalStatus) console.log('Your book request approved. You can rent this van now.')

    console.log(
      this.bookRequests[requestNumber].isApproved ? 'You approved this book request.' : 'You denied this book request.'
    )
  }

  rentVan(van, requestNumber) {
    if (!van.owner.bookRequests[requestNumber].isApproved)
      throw new Error("You need owner's approval to rent this van.")

    van.toggleAvailability()
    this.rentHistory.push(van)

    console.log(`You successfully rented ${van.owner.firstName} ${van.owner.lastName}'s van.`)
  }

  returnVan(van) {
    van.toggleAvailability()
    van.setLocation(van.owner)
  }

  sendVanBuddyRequest(person) {
    this.vanBuddyRequests.push({ sender: this, receiver: person, isApproved: false })
    person.vanBuddyRequests.push({ sender: this, receiver: person, isApproved: false })
  }

  respondVanBuddyRequest(requestNumber, approvalStatus) {
    this.vanBuddyRequests[requestNumber].isApproved = approvalStatus

    if (approvalStatus)
      console.log(
        `Congrats!!! You just became van buddies with ${this.vanBuddyRequests[requestNumber].sender.firstName} ${this.vanBuddyRequests[requestNumber].sender.lastName}`
      )

    console.log("Sorry :'(")
  }

  reviewVan(text, van, rating) {
    if (this.listings.includes(van)) throw new Error("You can't add review to your vans.")
    if (!this.rentHistory.includes(van)) throw new Error('First you need to rent this van.')
    van.addReview(text, this, rating)
  }
}

module.exports = Person
