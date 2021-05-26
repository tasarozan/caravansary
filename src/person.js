const Van = require('./van.js')

class Person {
  listings = []
  vanBuddy = false
  description = ''
  _memberTime = (() => {
      const today = new Date()
      return `Member since ${today.toLocaleString('en-US', { month: 'long' })}/${today.getFullYear()}`
    })()

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
  get memberTime() {
    return this._memberTime
  }
  set memberTime(value) {
    throw new Error(
      'You can not change your membership time.'
    )
  }
}

module.exports = Person