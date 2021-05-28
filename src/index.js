const Person = require('./person')

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

ozan.listings[0].changeAvailability()

ozan.listings[0].addPhoto('Van.jpg')

ozan.addReview('hey', thuan.listings[0])

// console.log(thuan.listings[0].reviews)

ozan.createBookRequest(thuan.listings[0])

console.log(ozan.bookRequests[0].bookVan(thuan.listings[0]))

console.log(ozan.bookRequests[0])

// ozan.bookRequests[0].bookApproval(thuan.listings[0], true)
