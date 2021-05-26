class Van {
  description = ''
  availability = true
  photos = []
  _reviews = {
    text: '',
    reviewer: []
  }
  rating = 0

  constructor(type, make, model, year, berths, location, price, owner) {
    this.type = type
    this.make = make
    this.model = model
    this.year = year
    this.berths = berths
    this.location = location
    this.price = price
    this._owner = owner
  }
  changeAvailabilitty() {
    this.availability = !this.availability
  }
  addPhoto(photo) {
    this.photos.push(photo)
  }
  addReview(text, person) {
    this.reviews.text = text
    this.reviews.reviewer = person
  }
  get owner() {
    return this._owner
  }
  set owner(person) {
    throw new Error('Owner can not be changed.')
  }
  get reviews() {
    return this._reviews
  }
  set reviews(newReview) {
    throw new Error('Reviews can not be modified.')
  }
}

module.exports = Van