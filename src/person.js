const Van = require('./van')
const BookVan = require('./book-van')

class Person {
  listings = []

  bio = ''

  rentHistory = []

  bookRequests = []

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

  createBookRequest(van) {
    const bookRequest = new BookVan(van, this)
    this.bookRequests.push(bookRequest)
    return bookRequest
  }

  addReview(text, van) {
    if (this.listings.some(x => x == van)) throw new Error("You can't add review to your vans.")
    van.addReview(text)
    van.reviews.reviewer.push(this)
  }
}

module.exports = Person
