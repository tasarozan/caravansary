const Person = require('./src/person')

const ozan = new Person('Ozan', 'Tasar', 24, 'Istanbul')
const thuan = new Person('Thuan', 'Vo', 30, 'Hannover')
const ben = new Person('Ben', 'Sukstorf', 27, 'Frankfurt')
const robert = new Person('Robert', 'Karpinksi', 32, 'Berlin')
const serhat = new Person('Serhat', 'Ciftci', 28, 'Gelsenkirschen')
const erkal = new Person('Erkal', 'Tufekci', 26, 'Gingen')

ozan.createVan('Caravan', 'Swift', 'Edge', 2018, 3, 'Istanbul', '$150.00')
thuan.createVan('Campervan', 'VW', 'T5', 2015, 4, 'Hannover', '$65.00')
erkal.createVan('Motorhome', 'Fiat', 'McLouis 251', 2002, 3, 'Frankfurt', '$125.00')
serhat.createVan('Trailer Tent', 'Conway', 'Countryman', 1998, 4, 'Berlin', '$60.00')
robert.createVan('Campervan', 'VW', 'T5 T32', 2013, 4, 'Gelsenkirschen', '$115.00')
ben.createVan('Other', 'Rapido', 'Folding Caravan', 1980, 4, 'Gingen', '$22.00')

  ozan.addDescription('Vans are awesome!!!')

  ozan.listings[0].addDescription('I am speed')

  ozan.listings[0].changeAvailabilitty()

  ozan.listings[0].addPhoto('Van.jpg')

  ozan.listings[0].addReview('U SUCK!!', thuan)

  console.log(ozan.memberTime)
  console.log(ozan.listings[0].reviews.reviewer)