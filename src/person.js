const Van = require('./van')

class Person {
  listings = []

  bio = ''

  rentedVans = []

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
    van.owner.bookRequests.push({ van, approval: false, customer: this, owner: van.owner })
    this.bookRequests.push({ van, approval: false, customer: this, owner: van.owner })
    console.log('Waiting for the owner approval.')
  }

  bookApproval(van, requestNumber, approval) {
    if (this != van.owner) throw new Error('You need to be owner of the van in order to approve booking.')
    this.bookRequests[requestNumber].approval = approval
    this.bookRequests[requestNumber].customer.bookRequests.filter(x => x.van == van).approval = approval
    if (approval) {
      console.log('Your book request approved. You can rent this van now.')
    }
    console.log(
      this.bookRequests[requestNumber].approval ? 'You approved this book request.' : 'You denied this book request.'
    )
  }

  rentVan(van, requestNumber) {
    if (!van.owner.bookRequests[requestNumber].approval) throw new Error('You need owners approval to rent this van.')
    van.changeAvailability()
    this.rentedVans.push(van)
    console.log(`You successfully rented ${van.owner.firstName} ${van.owner.lastName}'s van.`)
  }

  backFromRent(van) {
    van.changeAvailability()
    van.trackLocation(van.owner)
  }

  becomeVanBuddy(person) {
    this.vanBuddyRequests.push({ sendFrom: this, toWhom: person, approval: false })
    person.vanBuddyRequests.push({ sendFrom: this, toWhom: person, approval: false })
  }

  vanBuddyApproval(requestNumber, approval) {
    this.vanBuddyRequests[requestNumber].approval = approval
    console.log(
      `Congrats!!! You just became van buddies with ${this.vanBuddyRequests[requestNumber].sendFrom.firstName} ${this.vanBuddyRequests[requestNumber].sendFrom.lastName}`
    )
  }

  addReview(text, van, rating) {
    if (this.listings.includes(van)) throw new Error("You can't add review to your vans.")
    if (!this.rentedVans.includes(van)) throw new Error('First you need to rent this van.')
    van.addReview(text, this, rating)
  }
}

module.exports = Person
