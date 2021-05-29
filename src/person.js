const Van = require('./van')

class Person {
  listings = []

  bio = ''

  rentedVans = []

  bookRequestsReceived = []

  bookRequestsSend = []

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
    van.owner.bookRequestsReceived.push({ van, approval: false, customer: this })
    this.bookRequestsSend.push({ van, approval: false, owner: van.owner })
    console.log('Waiting for the owner approval.')
  }

  bookApproval(van, requestNumber, approval) {
    if (this != van.owner) throw new Error('You need to be owner of the van in order to approve booking.')
    this.bookRequestsReceived[requestNumber].approval = approval
    this.bookRequestsReceived[requestNumber].customer.bookRequestsSend.filter(x => x.van == van).approval = approval
    if (approval) {
      console.log('Your book request approved. You can rent this van now.')
    }
    console.log(
      this.bookRequestsReceived[requestNumber].approval
        ? 'You approved this book request.'
        : 'You denied this book request.'
    )
  }

  rentVan(van, requestNumber) {
    if (this.bookRequestsSend[requestNumber].approval) throw new Error('You need owners approval to rent this van.')
    van.changeAvailability()
    this.rentedVans.push(van)
    console.log(`You successfully rented ${van.owner.firstName} ${van.owner.lastName}'s van.`)
  }

  addReview(text, van) {
    if (this.listings.includes(van)) throw new Error("You can't add review to your vans.")
    if (!this.rentedVans.includes(van)) throw new Error('First you need to rent this van.')
    van.addReview(text, this)
  }
}

module.exports = Person
