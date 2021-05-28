class Van {
  description = ''

  availability = true

  reviews = {
    text: '',
    reviewer: [],
  }

  rating = 0

  photos = []

  constructor(type, make, model, year, berths, location, price, owner) {
    this.type = type
    this.make = make
    this.model = model
    this.year = year
    this.berths = berths
    this.location = location
    this.price = price
    this.owner = owner
  }

  changeAvailability() {
    this.availability = !this.availability
  }

  addPhoto(photo) {
    this.photos.push(photo)
  }

  addReview(text) {
    this.reviews.text = text
  }
}

module.exports = Van
