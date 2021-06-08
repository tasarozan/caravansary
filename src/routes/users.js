const express = require('express')

const router = express.Router()

const User = require('../models/user')

const ozan = new User('Ozan', 'Tasar', 24, 'Istanbul')
const thuan = new User('Thuan', 'Vo', 30, 'Hannover')
const ben = new User('Ben', 'Sukstorf', 27, 'Frankfurt')
const robert = new User('Robert', 'Karpinksi', 32, 'Berlin')
const serhat = new User('Serhat', 'Ciftci', 28, 'Gelsenkirschen')
const erkal = new User('Erkal', 'Tufekci', 26, 'Gingen')

ozan.createVan('Caravan', 'Swift', 'Edge', 2018, 3, 'Istanbul', '$150.00')
thuan.createVan('Campervan', 'VW', 'T5', 2015, 4, 'Hannover', '$65.00')
erkal.createVan('Motorhome', 'Fiat', 'McLouis 251', 2002, 3, 'Frankfurt', '$125.00')
serhat.createVan('Trailer Tent', 'Conway', 'Countryman', 1998, 4, 'Berlin', '$60.00')
robert.createVan('Campervan', 'VW', 'T5 T32', 2013, 4, 'Gelsenkirschen', '$115.00')
ben.createVan('Other', 'Rapido', 'Folding Caravan', 1980, 4, 'Gingen', '$22.00')

const users = [ozan, thuan, serhat, ben, robert, erkal]
/* GET users listing. */
router.get('/', (req, res) => {
  let result = users
  if (req.query.name) {
    result = users.find(user => user.firstName.toLowerCase() == req.query.name)
  }
  res.send(result)
})

router.get('/:userId', (req, res) => {
  const user = users[req.params.userId]
  if (user) res.render('user', { user })
  else res.sendStatus(404)
})

router.get('/:userId/:vanId', (req, res) => {
  res.send(users[req.params.userId].listings[req.params.vanId])
})

module.exports = router
