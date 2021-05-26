class Van {
  constructor(type, make, model, year, berths, location, price, owner) {
    this.type = type
    this.make = make
    this.model = model
    this.year = year
    this.berths = berths
    this.location = location
    this.price = price
    this.owner = owner
    this.description = ''
    this.availability = true
    this.photos = []
    this.reviews = {
      text: '',
      reviewer: [],
    }
    this.rating = 0
  }

  changeAvailabilitty() {
    this.availability = !this.availability
  }

  addPhoto(photo) {
    this.photos.push(photo)
  }
}

module.exports = Van
