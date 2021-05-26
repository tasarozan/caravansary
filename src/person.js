const Van = require('./van')

class Person {
  constructor(firstName, lastName, age, location) {
    this.firstName = firstName
    this.lastName = lastName
    this.age = age
    this.location = location
    this.listings = []
    this.description = ''
    this.memberTime = (() => {
      const today = new Date()
      return `Member since ${today.toLocaleString('en-US', {
        month: 'long',
      })}/${today.getFullYear()}`
    })()
  }

  createVan(type, make, model, year, berths, location, price) {
    const van = new Van(type, make, model, year, berths, location, price, this)
    this.listings.push(van)
    return van
  }
}

module.exports = Person
