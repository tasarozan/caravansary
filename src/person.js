const Van = require('./van.js')

class Person {
  listings = []
  description = ''
  memberTime = (() => {
      const today = new Date()
      return `Member since ${today.toLocaleString('en-US', { month: 'long' })}/${today.getFullYear()}`
    })()

  constructor(firstName, lastName, age, location) {
    this.firstName = firstName
    this.lastName = lastName
    this.age = age
    this.location = location
  }
  addDescription(text) {
    this.description = text
  }
  createVan(type, make, model, year, berths, location, price) {
    const van = new Van(type, make, model, year, berths, location, price)
    this.listings.push(van)
    van.owner = this
    return van
  }
}

module.exports = Person