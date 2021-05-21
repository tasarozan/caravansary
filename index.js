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
      return `Member since ${today.toLocaleString('en-US', { month: 'long' })}/${today.getFullYear()}`
    })()
  }
  addListing(van) {
    this.listings.push(van)
    van.owner = this
  }
  addDescription(text) {
    this.description = text
  }
}
class Van {
  constructor(type, make, model, year, berths, location, price) {
    this.type = type
    this.make = make
    this.model = model
    this.year = year
    this.berths = berths
    this.location = location
    this.price = price
    this.owner = {}
    this.description = ''
    this.availability = true
    this.photos = []
    this.reviews = {
      text: '',
      reviewer: []
    }
    this.rating = 0
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

  const caravan = new Van('Caravan', 'Swift', 'Edge', 2018, 3, 'Istanbul', '$150.00')
  const campervan = new Van('Campervan', 'VW', 'T5', 2015, 4, 'Hannover', '$65.00')
  const motorhome = new Van('Motorhome', 'Fiat', 'McLouis 251', 2002, 3, 'Frankfurt', '$125.00')
  const trailerTent= new Van('Trailer Tent', 'Conway', 'Countryman', 1998, 4, 'Berlin', '$60.00')
  const luxuryVan = new Van('Campervan', 'VW', 'T5 T32', 2013, 4, 'Gelsenkirschen', '$115.00')
  const foldingCaravan = new Van('Other', 'Rapido', 'Folding Caravan', 1980, 4, 'Gingen', '$22.00')

  const ozan = new Person('Ozan', 'Tasar', 24, 'Istanbul')
  const thuan = new Person('Thuan', 'Vo', 30, 'Hannover')
  const ben = new Person('Ben', 'Sukstorf', 27, 'Frankfurt')
  const robert = new Person('Robert', 'Karpinksi', 32, 'Berlin')
  const serhat = new Person('Serhat', 'Ciftci', 28, 'Gelsenkirschen')
  const erkal = new Person('Erkal', 'Tufekci', 26, 'Gingen')

  ozan.addListing(caravan)
  thuan.addListing(campervan)
  ben.addListing(motorhome)
  robert.addListing(trailerTent)
  serhat.addListing(luxuryVan)
  erkal.addListing(foldingCaravan)

  ozan.addDescription('Vans are awesome!!!')

  ozan.listings[0].addDescription('I am speed')

  ozan.listings[0].changeAvailabilitty()

  ozan.listings[0].addPhoto('Van.jpg')

  ozan.listings[0].addReview('U SUCK!!', thuan)

  console.log(ozan.memberTime)