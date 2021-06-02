class Van {
  description = ''

  availability = true

  reviews = []

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

  toggleAvailability() {
    this.availability = !this.availability
  }

  addPhoto(photo) {
    this.photos.push(photo)
  }

  addReview(text, reviewer, rating) {
    this.reviews.push({ text, reviewer, rating })
  }

  setLocation(customer) {
    this.location = customer.location
  }

  get averageRating() {
    return this.reviews.reduce((a, b) => a + b.rating, 0) / this.reviews.length
  }
}

module.exports = Van
