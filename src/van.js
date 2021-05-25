class Van {
  owner = {}
  description = ''
  availability = true
  photos = []
  reviews = {
    text: '',
    reviewer: []
  }
  rating = 0

  constructor(type, make, model, year, berths, location, price) {
    this.type = type
    this.make = make
    this.model = model
    this.year = year
    this.berths = berths
    this.location = location
    this.price = price
  }
  addDescription(text) {
    this.description = text
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
}

module.exports = Van